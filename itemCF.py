import pandas as pd
import numpy as np
# from sklearn.metrics import pairwise_distances
# from scipy.spatial.distance import cosine, correlation

# read data
r_cols = ['', 'userId', 'movieId', 'rating']
ratings = pd.read_csv('~/Downloads/smallRatingResult.csv', 
                      names=r_cols, 
                      usecols=r_cols, 
                      header=0, 
                      index_col=0,
                      low_memory=False, 
                      dtype={'userId':'int', 
                             'movieId':'int',
                             'rating':'float'})

# print(ratings)


# read movie detail and join with ratings
m_cols = ['id', 'title']
movies = pd.read_csv('~/Downloads/movieDetail.csv', 
                      usecols=m_cols, 
                      header=0, 
                      low_memory=False, 
                     )
ratings = pd.merge(ratings, movies, left_on='movieId', right_on='id')

# print(ratings)

movieStats = ratings.groupby('title').agg({'rating': [np.size, np.mean]})

print(movieStats)

# create pivot table
userRatings = ratings.pivot_table(index=['userId'], columns=['title'], values='rating')
corrMatrix = userRatings.corr(method='pearson')
# corrMatrix = userRatings.corr(method='pearson', min_periods=100)


print(userRatings)
# print(corrMatrix)

# print('----->', corrMatrix.count(axis=1))

myRatings = userRatings.loc[3].dropna()

# print('\n\n', myRatings)