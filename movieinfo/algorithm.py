import pandas as pd
import pyspark
from pyspark import SparkConf, SparkContext
from pyspark.sql import SparkSession
from pyspark.mllib.linalg.distributed import RowMatrix
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
import csv


class TagProcessing:

    def float_int(self, x):
        return int(x)

    def read_link_file(self, link_path, tag_path, write_path):
        links = pd.read_csv(link_path, header=0, index_col=0)
        tags = pd.read_csv(tag_path, header=0, index_col=0)
        result = pd.DataFrame()
        len = tags.shape[0]
        temp = 0
        while temp < len - 1:
            min = temp
            if temp + 10000 < len -1:
                max = temp + 10000
            else:
                max = len -1
            tag_slice = tags.iloc[min:max]
            temp_result = tag_slice.merge(links, how='left', on='movieId')
            temp_result = temp_result.drop(['movieId', 'imdbId'], axis=1)
            result = result.append(temp_result)
            print("\r" + 'processing %d out of %d items...' % (temp, len), end='')
            temp = max
        result = result[['tmdbId', 'tagId', 'relevance']]
        result.to_csv(write_path)

    def read_rating(self, rating_path, link_path, write_path):
        rating = pd.read_csv(rating_path)
        result = pd.DataFrame()
        id = pd.read_csv(link_path)
        id = id.drop(['imdbId'], axis=1)
        len = rating.shape[0]
        temp = 0
        while temp < len - 1:
            min = temp
            if temp + 10000 < len - 1:
                max = temp + 10000
            else:
                max = len - 1
            rating_slice = rating.iloc[min: max]
            temp_result = rating_slice.merge(id, how='left', on='movieId')
            temp_result = temp_result.drop(['movieId', "Unnamed: 0"], axis=1)
            result = result.append(temp_result)
            print("\r" + 'processing %d out of %d items...' % (temp + 1, len), end='')
            temp = max
        result.to_csv(write_path)

    def pivot_similarity(self, tag_path, write_path):
        spark = SparkSession.builder.\
            appName("Python Spark create RDD example")\
            .config("spark.some.config.option", "some-value") \
            .getOrCreate()
        # spark.conf.set('spark.sql.pivotMaxValues', u'70000')
        df = spark.read.format('com.databricks.spark.csv').options(header='true', inferschema='true').load(tag_path,
                                                                                                           header=True)
        df = df.drop("_c0")
        df = df.groupBy("tmdbId").pivot("tagId").sum("relevance")
        df.write.csv(path=write_path, header=True, sep=",", mode='overwrite')

    def pivot_sim(self, tag_path, write_path):
        tags = pd.read_csv(tag_path,  header=0, index_col=0)
        pivot = tags.pivot_table(values='relevance', index=['tmdbId'], columns=['tagId'])
        pivot.to_csv(write_path)

    def similarity_sim(self, pivot_path, sim_path):
        pivot = pd.read_csv(pivot_path)
        pivot = pd.DataFrame(pivot).ffill()
        result = cosine_similarity(pivot)
        # print(result, type(result))
        similarity_matrix = pd.DataFrame(result)
        similarity_matrix.to_csv(sim_path)

    def query_sim(self, sim_path, pivot_path):
        names = []
        pivot = pd.read_csv(pivot_path)
        print("read pivot done")
        for i in pivot["tmdbId"]:
            names.append(int(i))
        sim = pd.read_csv(sim_path, header=0, index_col=0)
        print("read sim done")
        result = {}
        len = sim.shape[0]
        count = 0
        for i in range(sim.shape[0]):
            temp = sim.loc[i]
            sim.iloc[i, i] = 0
            temp_result = []
            for j in range(100):
                argmax = temp[temp == temp.max()].index
                argmax = np.random.choice(argmax)
                argmax = int(argmax)
                # print(argmax, type(argmax))
                sim.iloc[i, argmax] = 0
                temp_result.append(names[argmax])
            # print(temp_result)
            result[names[i]] = temp_result
            print("\r" + 'processing %d out of %d items...' % (count, len), end='')
            count += 1

        df = pd.DataFrame(result)
        df = df.transpose()
        df.to_csv("Data/output.csv")

    def query(self, movieId, num=100):
        result = pd.read_csv("DataCollection/MovieInfo/Data/output.csv", header=0, index_col=0)
        rs = []
        df = result.transpose()
        for i in list(df.keys()):
            rs.append(int(i))
        if movieId not in rs:
            return None
        else:
            temp = list(result.loc[movieId])
            return temp[:num]

    def query_list(self, dict, num=100):
        # df = pd.read_csv("Data/output.csv", header=0, index_col=0)
        # result = df.transpose()
        final = []
        remove = []
        original_like = dict.get("like")
        like = original_like[-10:]
        like.reverse()
        dislike = dict.get("dislike")
        count = 0
        lens = len(like)
        # print(lens)
        result = [[0 for i in range(100)] for j in range(lens)]
        for i in like:
            result[count] = self.query(i)
            count += 1
        # print(result)
        count = 0
        round = 0
        blocks = len(result)*len(result[0])
        while count < blocks:
            for i in range(lens):
                # print(i)
                # print(round * (lens - i))
                # print((round+1) * (lens - i))
                temp = result[i][round * (lens - i): (round + 1) * (lens - i)]
                # print(temp)
                final.extend(temp)
                count = len(final)
            round += 1
        # print(final)
        for j in dislike:
            remove.extend(self.query(j))

        final = [item for item in final if item not in remove]
        # final = [5, 1, 2, 2, 3]
        final_result = sorted(set(final), key=final.index)
        final_result = [item for item in final_result if item not in original_like and item not in dislike]
        return final_result[:num]

        
    def test(self, ratings):
        df = pd.read_csv(ratings)

        result = df.movieId.unique()

        print(result, len(result))

    def similarity_processing(self, tag_path):
        conf = SparkConf().setAppName("Test").setMaster("local")
        sc = SparkContext(conf=conf)
        spark = SparkSession.builder.config(conf=conf).getOrCreate()
        df = spark.read.format('com.databricks.spark.csv').options(header='true', inferschema='true').load(tag_path, header=True)
        df = df.drop("tagId")
        print(df.columns)
        rdd = df.rdd.map(list)
        mat = RowMatrix(rdd)
        print(mat.numCols(), mat.numRows())
        cs = mat.columnSimilarities()
        for x in cs.entries.collect():
            print(x)
        print(cs.numRows(), cs.numCols())



if __name__ == '__main__':
    # link_path = 'newData/linkResults.csv'
    # tag_path = 'newData/genome-scores.csv'
    # result_path = 'newData/tagResults.csv'
    rating_path = 'newData/ratings.csv'
    pivot_path = 'Data/pivot1.csv'
    similarity_path = 'Data/sim.csv'
    tp = TagProcessing()
    # tp.read_link_file(link_path, tag_path, result_path)
    # tp.pivot_similarity(result_path, pivot_path)
    # tp.similarity_processing(pivot_path)
    # tp.pivot_sim(result_path, pivot_path)
    # tp.similarity_sim(pivot_path, similarity_path)
    # tp.query_sim(similarity_path, pivot_path)
    item = tp.query(15, 2)
    print(item)
    # tp.test(rating_path)