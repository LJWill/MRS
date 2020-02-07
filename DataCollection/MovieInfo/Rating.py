import pandas as pd

class Rating:

    def float_int(self, x):
        if not pd.isnull(x):
            return int(x)
        else:
            return x

    def padding(self, x):
        temp = str(x)
        lens = len(temp)
        if lens < 7:
            for i in range(0, 7-lens):
                temp = "0" + temp
                # print(i)
        temp = "tt" + temp
        return temp

    def read_rating(self, rating_path, link_path, write_path):
        rating = pd.read_csv(rating_path)
        # print(rating.shape[0])
        id = pd.read_csv(link_path)
        # id['imdbId'] = id['imdbId'].map(self.padding)
        # id = id.drop(['tmdbId'], axis=1)
        id = id.drop(['imdbId'], axis=1)
        result = rating.merge(id, how='left', on='movieId')
        result = result.drop(['movieId', "Unnamed: 0"], axis=1)
        result.to_csv(write_path)


if __name__ == '__main__':
    md = Rating()
    rating_path = 'Data/ratings.csv'
    link_path = 'Data/linkResults.csv'
    new_rating_path = 'Data/finalRatings.csv'
    md.read_rating(rating_path, link_path, new_rating_path)
