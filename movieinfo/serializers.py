from rest_framework import serializers

from movieinfo.models import *


class UserHistorySerializer(serializers.ModelSerializer):

    class Meta:
        model = UserHistory
        fields = '__all__'

    def get_unique_together_validators(self):
        """Overriding method to disable unique together checks"""
        return []

    def create(self, validated_data):
        userHistory, created = UserHistory.objects.update_or_create(
            user_iduser=validated_data.get('user_iduser', None),
            movie_idmovie=validated_data.get('movie_idmovie', None),
            defaults={
                'userAction' : validated_data.get('userAction', None),
            })

        return userHistory

# class PeopleSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = People
#         fields = ('idperson', 'name', 'profileimage')


class MovieBriefSerializer(serializers.ModelSerializer):
    genre = serializers.SlugRelatedField(
        many=True, slug_field='genrename', read_only=True)
    rating_movie = serializers.SerializerMethodField()

    def get_rating_movie(self, movie):
        ratings = Ratings.objects.filter(
            user_iduser=self.context['iduser'], movie_idmovie=movie)
        serializer = RatingSerializer(
            instance=ratings, many=True, read_only=True)
        # serializer.is_valid()
        return serializer.data

    class Meta:
        model = Movie
        fields = ('idmovie', 'title', 'poster',
                  'genre', 'adult', 'rating_movie')


class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ratings
        fields = '__all__'


class CollectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Collections
        fields = '__all__'


class MovieDetailSerializer(serializers.ModelSerializer):
    images = serializers.SlugRelatedField(
        many=True, slug_field='backdrop', read_only=True)
    company = serializers.SlugRelatedField(
        many=True, slug_field='name', read_only=True)
    genre = serializers.SlugRelatedField(
        many=True, slug_field='genrename', read_only=True)
    # casts = PeopleSerializer(many=True)
    # directors = PeopleSerializer(many=True)
    rating_movie = serializers.SerializerMethodField()
    collectionid = CollectionSerializer()

    def get_rating_movie(self, movie):
        ratings = Ratings.objects.filter(
            user_iduser=self.context['iduser'], movie_idmovie=movie)
        serializer = RatingSerializer(
            instance=ratings, many=True, read_only=True)
        return serializer.data

    class Meta:
        model = Movie
        fields = '__all__'
