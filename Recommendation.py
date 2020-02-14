import os
from datetime import datetime

import django
from surprise import *
from surprise import Dataset, Reader
from surprise.model_selection import train_test_split

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "movie.settings")
django.setup()
import pandas as pd
from movieinfo import models as movies
from surprise.model_selection import cross_validate


class Recommender:
    def recommend(self):
        # df = pd.DataFrame(list(movies.Ratings.objects.all().values("user_iduser_id", "movie_idmovie_id", "rating")))

        df = pd.read_csv("tagResults.csv")

        reader = Reader(rating_scale=(1, 10), line_format='item user rating')
        data = Dataset.load_from_df(df, reader)
        trainset, testset = train_test_split(data, test_size=.25)
        print("load")
        list_algos = []
        # algo_KNNBasic = KNNBasic(sim_options={"user_based": False})
        # list_algos.append((algo_KNNBasic,"KNNBasic"))

        # algo_KNNWithMeans = KNNWithMeans()
        # list_algos.append((algo_KNNWithMeans,"KNNWithMeans"))
        #
        # algo_KNNWithZScore = KNNWithZScore()
        # list_algos.append((algo_KNNWithZScore,"KNNWithZScore"))

        # algo_KNNBaseline =KNNBaseline()
        # list_algos.append((algo_KNNBaseline,"KNNBaseline"))
        #
        # algo_SVD =SVD()
        # list_algos.append((algo_SVD,"SVD"))
        #
        # algo_SVDpp = SVDpp()
        # list_algos.append((algo_SVDpp,"SVDpp"))

        # algo_NMF = NMF()
        # list_algos.append((algo_NMF,"NMF"))

        # algo_CoClustering = CoClustering()
        # list_algos.append((algo_CoClustering,"CoClustering"))
        # #
        algo_SlopeOne = SlopeOne()
        list_algos.append((algo_SlopeOne,"SlopeOne"))

        for algo,name in list_algos:
            algo = self.train(trainset,testset, algo,name)



    def train(self, trainset, testset, algo, name):
        starttime = datetime.now()
        algo.fit(trainset)
        pred = algo.predict(testset[0][0], testset[0][1]
                            , verbose=True)
        endtime = datetime.now()

        print(name + ": %d seconds"%(endtime - starttime).seconds)
        dump.dump(name, algo=algo, verbose= 0)
        return algo


if __name__ == '__main__':
    rc = Recommender()
    rc.recommend()
