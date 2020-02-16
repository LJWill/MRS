from django.contrib import admin
from django.urls import path, include
from .api import *

urlpatterns = [
  path('movies/', MovieListAPI.as_view()),
  path('top_rated/', TopRatedMovieAPI.as_view()),
  path('info/<int:pk>/', MovieDetailAPI.as_view()),
  path('info/rating/', RatingAPI.as_view()),
  path('info/userhistory/', CreateUserHistoryAPI.as_view()),
  path('info/usermovies/', RetrieveUserHistoryAPI.as_view()),
]
