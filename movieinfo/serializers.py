from rest_framework import serializers

from movieinfo.models import *


class PeopleGSerializer(serializers.ModelSerializer):
    class Meta:
        model = People
        fields = ('idperson', 'name', 'profileimage')


class MovieBriefSerializer(serializers.ModelSerializer):
    genre = serializers.SlugRelatedField(many=True, slug_field='genrename', read_only=True)

    class Meta:
        model = Movie
        fields = ('idmovie','title', 'poster', 'genre', 'adult')


class MovieDetailSerializer(serializers.ModelSerializer):
    images = serializers.SlugRelatedField(many=True, slug_field='backdrop', read_only=True)
    company = serializers.SlugRelatedField(many=True, slug_field='name', read_only=True)
    genre = serializers.SlugRelatedField(many=True, slug_field='genrename', read_only=True)
    casts = PeopleGSerializer(many=True)
    directors = PeopleGSerializer(many=True)

    class Meta:
        model = Movie
        fields = '__all__'

class RatingSerializer(serializers.ModelSerializer):

    class Meta:
        model = Ratings
        fields = '__all__'

    def create(self, validated_data):
        # print(validated_data)
        rating = Ratings.objects.create(
            movie_idmovie = Movie.objects.get(idmovie=validated_data['movie_idmovie']),
            user_iduser= User.objects.get(iduser=validated_data['user_iduser']),
            rating = validated_data['rating']
        )

        rating.save()

        return rating