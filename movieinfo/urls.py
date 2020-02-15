from django.contrib import admin
from django.urls import path, include
from .api import *

urlpatterns = [
  path('movies/', MovieListAPI.as_view()),
  path('info/<int:pk>/', MovieDetailAPI.as_view()),
  path('info/rating/', RatingAPI.as_view()),
  path('info/userhistory/', createUserHistoryAPI.as_view()),
  path('info/usermovies/', retrieveUserHistoryAPI.as_view()),
]
