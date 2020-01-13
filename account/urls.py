from django.conf.urls import url
from django.contrib import admin
from django.urls import path, include, re_path
from .api import RegistrationAPI
from .api import UserViewSet

# from rest_framework.routers import DefaultRouter, SimpleRouter
from djoser import views as djoser_views
from rest_framework_jwt import views as jwt_views
# from spauser import views

# router = DefaultRouter(trailing_slash=False)
# router.register(r'users', UserViewSet, basename='user')

urlpatterns = [
  # url(r'^api/', include(router.urls), name='user_list'),
  path('register', RegistrationAPI.as_view()),
  # path('api/auth/login', LoginAPI.as_view()),
  # path('api/auth/users', include(router.urls)),
]