from django.http import Http404
from rest_framework import status
from rest_framework.generics import get_object_or_404
from rest_framework.views import APIView
from rest_framework.pagination import PageNumberPagination, LimitOffsetPagination, CursorPagination
from rest_framework.response import Response
from .models import *
from .serializers import *
from rest_framework_jwt.utils import jwt_decode_handler


class MovieDetailAPI(APIView):
    serializer_class = MovieDetailSerializer

    def get_object(self, pk):
        try:
            return Movie.objects.get(pk=pk)
        except Movie.DoesNotExist:
            raise Http404

    def get(self, request, pk):

        snippet = self.get_object(pk)
        serializer = MovieDetailSerializer(snippet, context={'iduser': 1})
        # serializer.get_rating_movie(1)
        return Response(serializer.data, status=status.HTTP_200_OK)

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
        page_movies = page_obj.paginate_queryset(
            movies, request=request, view=self)
        serializer = self.serializer_class(
            page_movies, many=True, context={'iduser': 1})
        return Response(serializer.data, status=status.HTTP_200_OK)


class createUserHistoryAPI(APIView):
    serializer_class = CreateUserHistorySerializer
    userhistory = UserHistory.objects.all()

    def delete(self, request):
        decode_payload = jwt_decode_handler(request.data['token'])
        serializer = self.serializer_class(data=request.data, context={
                                           'user_id': decode_payload['user_id']})
        userhistory = UserHistory.objects.get(
            user_iduser=decode_payload['user_id'], movie_idmovie=request.data['movie_idmovie'])

        if serializer.is_valid(raise_exception=True):
            userhistory.delete()
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def post(self, request):
        decode_payload = jwt_decode_handler(request.data['token'])
        serializer = self.serializer_class(data=request.data, context={
                                           'user_id': decode_payload['user_id']})

        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class retrieveUserHistoryAPI(APIView):
    serializer_class = RetrieveUserHistorySerializer

    def post(self, request):
        decode_payload = jwt_decode_handler(request.data['token'])
        userhistory = UserHistory.objects.filter(
            user_iduser=decode_payload['user_id'])
        serializer = self.serializer_class(
            userhistory, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)


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
            ratings = Ratings.objects.get(
                movie_idmovie=rating['movie_idmovie'], user_iduser=rating['user_iduser'])
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
