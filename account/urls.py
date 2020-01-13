from django.conf.urls import url
from django.contrib import admin
from django.urls import path, include, re_path
from .api import RegistrationAPI, UserViewSet
from rest_framework.routers import DefaultRouter, SimpleRouter

router = DefaultRouter(trailing_slash=False)
router.register(r'list', UserViewSet, basename='user')


urlpatterns = [
  path('register', RegistrationAPI.as_view()),
  path('', include(router.urls), name='user_list'),
  # path('api/auth/login', LoginAPI.as_view()),
  # path('api/auth/users', include(router.urls)),
]