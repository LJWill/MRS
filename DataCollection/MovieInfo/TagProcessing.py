import pandas as pd

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

if __name__ == '__main__':
    link_path = 'newData/linkResults.csv'
    tag_path = 'newData/genome-scores.csv'
    write_path = 'newData/genomeResults.csv'
    tp = TagProcessing()
    tp.read_link_file(link_path, tag_path, write_path)