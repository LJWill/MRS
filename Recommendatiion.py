import os
import django
from surprise import SVD, accuracy,KNNBasic
from surprise import Dataset,Reader
from surprise.model_selection import train_test_split

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "movie.settings")
django.setup()
import pandas as pd
from movieinfo import models as movies
from surprise.model_selection import cross_validate
class Recommender:
    def recommend(self):
        df = pd.DataFrame(list(movies.Ratings.objects.all().values("user_iduser_id" ,"movie_idmovie_id",   "rating")))

        reader = Reader(rating_scale=(1,10),line_format='user item rating')
        print(df)
        data = Dataset.load_from_df(df, reader)
        trainset, testset = train_test_split(data, test_size=.25)
        algo = KNNBasic()
        algo.fit(trainset)
        pred = algo.predict(testset[0][0],testset[0][1]
                            , verbose=True)
        print(pred)


if __name__ == '__main__':
    rc = Recommender()
    rc.recommend()