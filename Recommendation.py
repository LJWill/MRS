import os
from datetime import datetime

import django
from surprise import *
from surprise import Dataset, Reader, accuracy
from surprise.model_selection import train_test_split

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "movie.settings")
django.setup()
import pandas as pd
from movieinfo import models as movies
from surprise.model_selection import cross_validate


class Recommender:
    def recommend(self):
        # for i in range(1, 20):
        #     print("No.%d genre start:" % i)
            # df = pd.read_csv("./rating/rating%d.csv" % i, header=None)
            df = pd.read_csv("filterRatings.csv")
            # df.columns = ['id', 'rating', 'Movie_idmovie', 'User_iduser']
            df = df[["userId", "tmdbId", "rating"]]
            print("Data retrieved")
            # df = pd.read_csv("ratings.csv")
            reader = Reader(rating_scale=(1, 5), line_format='user item rating')
            data = Dataset.load_from_df(df, reader)
            # trainset, testset = train_test_split(data, test_size=.1)
            print("load")
            list_algos = []
            # algo_KNNBasic_cos = KNNBasic(sim_options={'name': 'cosine',
            #     "user_based": False, 'min_support': 20})
            # list_algos.append((algo_KNNBasic_cos, "KNNBasic_cos"))

            algo_KNNBasic_msd = KNNBasic(sim_options={'name': 'msd',
                                                  "user_based": False, 'min_support': 20})
            list_algos.append((algo_KNNBasic_msd, "KNNBasic_msd"))

            algo_KNNBasic_pearson = KNNBasic(sim_options={'name': 'pearson',
                                                  "user_based": False, 'min_support': 20})
            list_algos.append((algo_KNNBasic_pearson, "KNNBasic_pearson"))

            # algo_KNNWithMeans = KNNWithMeans(sim_options={"user_based": False, 'min_support': 20})
            # list_algos.append((algo_KNNWithMeans,"KNNWithMeans"))

            algo_KNNWithZScore_cos = KNNWithZScore(sim_options={'name': 'cosine',
                "user_based": False, 'min_support': 20})
            list_algos.append((algo_KNNWithZScore_cos,"KNNWithZScore_cos"))

            algo_KNNWithZScore_msd = KNNWithZScore(sim_options={'name': 'msd',
                                                            "user_based": False, 'min_support': 20})
            list_algos.append((algo_KNNWithZScore_msd, "KNNWithZScore_msd"))

            algo_KNNWithZScore_pearson = KNNWithZScore(sim_options={'name': 'pearson',
                                                            "user_based": False, 'min_support': 20})
            list_algos.append((algo_KNNWithZScore_pearson, "KNNWithZScore_pearson"))

            algo_KNNBaseline_cos =KNNBaseline(sim_options={'name': 'cosine',
                "user_based": False, 'min_support': 20})
            list_algos.append((algo_KNNBaseline_cos,"KNNBaseline_cos"))

            algo_KNNBaseline_msd = KNNBaseline(sim_options={'name': 'msd',
                                                        "user_based": False, 'min_support': 20})
            list_algos.append((algo_KNNBaseline_msd, "KNNBaseline_msd"))

            algo_KNNBaseline_pearson = KNNBaseline(sim_options={'name': 'pearson',
                                                        "user_based": False, 'min_support': 20})
            list_algos.append((algo_KNNBaseline_pearson, "KNNBaseline_pearson"))
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
            # algo_SlopeOne = SlopeOne()
            # list_algos.append((algo_SlopeOne,"SlopeOne"))

            for algo, name in list_algos:
                algo = self.train(data, algo, name)

    def train(self, data, algo, name):
        starttime = datetime.now()
        # algo.fit(data)
        # df = algo.compute_similarities()
        # print(df)
        print(name + ":")
        cross_validate(algo, data, measures=['RMSE', 'MAE'], cv=4, verbose=True, n_jobs=-1)
        endtime = datetime.now()
        print('./KNNBasic/' + name + ": %d seconds" % (endtime - starttime).seconds)
        # print("RMSE is : %d, \nMAE is : %d \nFCP is : %d"%(accuracy.))
        dump.dump('./KNNBasic/' + name, algo=algo, verbose=0)
        return algo


if __name__ == '__main__':
    rc = Recommender()
    rc.recommend()
