from datetime import datetime
import pandas as pd

from surprise import *


class recommend:
    def recommend(self):
        for i in range(1, 20):
            print("genre %d start:" % i)
            (pred, algo) = dump.load("./KNNBasic/KNNBasic%d" % i)
            df = pd.read_csv("./genre/genre%d.csv" % i, header=None)

            df.columns = ['movieId']
            df.set_index(["movieId"], inplace=True)
            for j in range(0, 100):
                df[str(j)] = None
            # print(df)
            print("loading done")
            starttime = datetime.now()
            total = df.shape[0]
            count = 1
            for movieid in df['0'].index:
                print("\r" + 'processing %d out of %d items...' % (count, total),
                      end='')
                count += 1
                reco = algo.get_neighbors(algo.trainset.to_inner_iid(movieid), k=100)
                reco = [algo.trainset.to_raw_iid(inner) for inner in reco]
                count = 0
                for movie in reco:
                    df[str(count)][movieid] = movie
                    count += 1
                # print(df)
            endtime = datetime.now()
            df.to_csv("./genre/reco_genre%d.csv" % i)
            print("%d seconds" % (endtime - starttime).seconds)


if __name__ == '__main__':
    ub = recommend()
    ub.recommend()
