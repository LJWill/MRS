from django.conf.urls import url
from django.contrib import admin
from django.urls import path, include
from .api import RegisterAPI, LoginAPI, UserAPI, UserViewSet
from knox import views as knox_views
from rest_framework.routers import DefaultRouter, SimpleRouter

router = DefaultRouter(trailing_slash=False)
router.register(r'users', UserViewSet, basename='user')

urlpatterns = [
  url(r'^api/', include(router.urls), name='user_list'),
  path('api/auth', include('knox.urls')),
  path('api/auth/register', RegisterAPI.as_view()),
  path('api/auth/login', LoginAPI.as_view()),
  # path('api/auth/users', include(router.urls)),
  path('api/auth/logout', knox_views.LogoutView.as_view(), name='knox_logout')
]