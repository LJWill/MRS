import pandas as pd
import pyspark
from pyspark import SparkConf, SparkContext
from pyspark.sql import SparkSession
from pyspark.mllib.linalg.distributed import CoordinateMatrix, IndexedRow, IndexedRowMatrix, RowMatrix


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

    link_path = 'newData/linkResults.csv'
    tag_path = 'newData/genome-scores.csv'
    result_path = 'newData/tagResults.csv'
    pivot_path = 'newData/pivot.csv'
    tp = TagProcessing()
    # tp.read_link_file(link_path, tag_path, result_path)
    tp.pivot_similarity(result_path, pivot_path)
    # tp.similarity_processing(pivot_path)
