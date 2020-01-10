import pandas as pd



class Rating:

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
        # print(id.shape[0])
        id['imdbId'] = id['imdbId'].map(self.padding)
        id = id.drop(['tmdbId'], axis=1)
        # print(id)
        result = rating.merge(id, how='left', on='movieId')
        # print(result.shape[0])
        # result = result.drop(['tmdbId'], axis=1)
        result.to_csv(write_path)


if __name__ == '__main__':
    md = Rating()
    rating_path = 'Data/ratings.csv'
    link_path = 'Data/linksTest.csv'
    write_path = 'Data/ratingResult1.csv'
    md.read_rating(rating_path, link_path, write_path)