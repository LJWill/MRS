from django.http import Http404
from rest_framework import status
from rest_framework.generics import get_object_or_404
from rest_framework.views import APIView
from rest_framework.pagination import PageNumberPagination, LimitOffsetPagination, CursorPagination
from rest_framework.response import Response
from .models import Movie
from .serializers import *


class MovieDetailAPI(APIView):
    serializer_class = MovieDetailSerializer

    def get_object(self, pk):
        try:
            return Movie.objects.get(pk=pk)
        except Movie.DoesNotExist:
            raise Http404

    def get(self, request, pk):

        snippet = self.get_object(pk)
        serializer = MovieDetailSerializer(snippet,context = {'iduser':1})
        # serializer.get_rating_movie(1)
        return Response(serializer.data)

    # def post(self, request, format=None):
    #     movie_id = request.data
    #     serializer = RatingSerializer(data=movie_id)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class MovieListAPI(APIView):
    serializer_class = MovieBriefSerializer
    pagination_class = PageNumberPagination

    def get(self, request):
        movies = Movie.objects.all()
        page_obj = MyPageNumber()
        page_movies = page_obj.paginate_queryset(movies, request=request, view=self)
        serializer = self.serializer_class(page_movies, many=True,context = {'iduser':1})
        return Response(serializer.data)

class FavouriteAPI(APIView):
    serializer_class = FavouriteSerializer

    def put(self,request):
        favourite = request.data
        print(favourite)
        serializer = self.serializer_class(data=favourite)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def delete(self,request):
        favorite = Favourite.objects.get(user_iduser=request.data['user_iduser'],movie_idmovie=request.data['movie_idmovie'])
        favorite.delete()
        return Response()

    def post(self, request):
        favorite = Favourite.objects.filter(user_iduser=request.data['user_iduser'])

        serializer = self.serializer_class(favorite,many=True)

        return Response(serializer.data)

class MyPageNumber(PageNumberPagination):
    page_size = 10
    page_query_param = 'page'
    page_size_query_param = 'size'
    max_page_size = None


class RatingAPI(APIView):
    serializer_class = RatingSerializer

    def put(self, request):
        rating = request.data
        try:
            ratings = Ratings.objects.get(movie_idmovie=rating['movie_idmovie'], user_iduser=rating['user_iduser'])
            serializer = self.serializer_class(ratings, data=rating)
            serializer.is_valid(raise_exception=True)
        except:
            serializer = self.serializer_class(data=rating)
            serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED
        )

3
