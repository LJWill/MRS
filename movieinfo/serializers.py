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
