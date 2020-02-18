import pandas as pd
import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "movie.settings")
django.setup()
from movieinfo import models as db


class recommender:
    dislike_lim = 10

    def __init__(self):
        self.list_dfs = [pd.read_csv("./genre/reco_genre%d.csv" % i,index_col=0) for i in range(1, 20)]
        # for df in self.list_dfs:
        #     print(df)


    def recommend(self, userHistory):

        notRecommend = []
        for movie in userHistory["dislike"]:
            genres = self.getGenres(movie)
            dict = self.getSimilar(movie, genres)
            for serie in dict.values():
                result = [serie[i] for i in range(0, self.dislike_lim)]
                notRecommend = notRecommend + result
        notRecommend = [movie for movie in notRecommend if notRecommend.count(movie) == 1]
        genres_weight = {}
        movie_sim = {}
        recommend = []
        like_lim = 0
        while len(recommend) < 1:
            recommend = []
            like_lim += 1
            for movie in userHistory["like"]:
                genres = self.getGenres(movie)
                dict = self.getSimilar(movie, genres)
                for serie in dict.values():
                    result = [serie[i] for i in range(0, like_lim)]
                    recommend = result + recommend

            recommend = list(set(recommend).difference(set(notRecommend)))
        return recommend
        # for genre in genres:
        #     if genre in genres_weight.keys():
        #         genres_weight[genre] += 1
        #     else:
        #         genres_weight[genre] = 1
        # genres_weight = {k: v for k, v in sorted(genres_weight.items(), key=lambda item: item[1])}
        # number, min = list(genres_weight.items())[0]
        # for key in genres_weight.keys():
        #     genres_weight[key] = int(genres_weight[key]/ min)

    def getGenres(self, movieid):
        try:
            movie = db.Movie.objects.get(idMovie=movieid)
            genres = list(movie.genre.all().values_list("idgenre", flat=True))
            return genres
        except Exception as e:
            print(e)
        return []

    def getSimilar(self, movieid, genres):
        result = {}
        for id in genres:
            df = self.list_dfs[id - 1]
            # index = list(df.head().index)[1]
            result[id] = df.loc[movieid]
        return result


reco = recommender()
his = {}
his["like"] = [155]
his["dislike"] = []
result = reco.recommend(his)
print((result))
