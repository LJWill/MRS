from django.contrib import admin
from django.urls import path, include
from .api import *

urlpatterns = [
  path('movies/', MovieListAPI.as_view()),
  path('movieInfo/<int:pk>/', MovieDetailAPI.as_view()),
  path('movieInfo/<int:pk>/rating', RatingAPI.as_view())
]
