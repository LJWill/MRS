# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models

gender = (
    ('male', 'Male'),
    ('female', 'Female'),
    ('notspecified', 'Not Specified'),
)


class Writer(models.Model):
    idwriter = models.IntegerField(db_column='idWriter', primary_key=True)  # Field name made lowercase.
    name = models.CharField(db_column='Name', max_length=45, blank=True, null=True)  # Field name made lowercase.
    gender = models.CharField(db_column='gender', max_length=32, choices=gender, default='male')
    biography = models.TextField(blank=True, null=True)
    birthday = models.DateField(db_column='birthDay', null=True)
    deathday = models.DateField(db_column='deathDay', null=True)
    birthplace = models.CharField(db_column='placeofBirth', max_length=100, blank=True, null=True)
    profileimage = models.CharField(db_column='profileImage', max_length=50, blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'writer'


class Star(models.Model):
    idstar = models.IntegerField(db_column='idStar', primary_key=True)  # Field name made lowercase.
    name = models.CharField(db_column='Name', max_length=45, blank=True, null=True)  # Field name made lowercase.
    gender = models.CharField(db_column='gender', max_length=32, choices=gender, default='male')
    biography = models.TextField(blank=True, null=True)
    birthday = models.DateField(db_column='birthDay', null=True)
    deathday = models.DateField(db_column='deathDay', null=True)
    birthplace = models.CharField(db_column='placeofBirth', max_length=100, blank=True, null=True)
    profileimage = models.CharField(db_column='profileImage', max_length=50, blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'star'


class Director(models.Model):
    iddirector = models.IntegerField(db_column='idDirector', primary_key=True)  # Field name made lowercase.
    name = models.CharField(db_column='Name', max_length=45, blank=True, null=True)  # Field name made lowercase.
    gender = models.CharField(db_column='gender', max_length=32, choices=gender, default='male')
    biography = models.TextField(blank=True, null=True)
    birthday = models.DateField(db_column='birthDay', null=True)
    deathday = models.DateField(db_column='deathDay', null=True)
    birthplace = models.CharField(db_column='placeofBirth', max_length=100, blank=True, null=True)
    profileimage = models.CharField(db_column='profileImage', max_length=50, blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'director'


class Genrelist(models.Model):
    idgenrelist = models.AutoField(db_column='idGenreList', primary_key=True)  # Field name made lowercase.
    genrename = models.CharField(db_column='GenreName', max_length=45)  # Field name made lowercase.

    class Meta:
        managed = True
        db_table = 'genrelist'


class Genre(models.Model):
    genrelist_idgenrelist = models.ForeignKey('Genrelist', models.DO_NOTHING,
                                              db_column='GenreList_idGenreList')  # Field name made lowercase.
    movie_idmovie = models.ForeignKey('Movie', models.DO_NOTHING,
                                      db_column='Movie_idMovie')  # Field name made lowercase.

    class Meta:
        managed = True
        db_table = 'genre'
        unique_together = (('genrelist_idgenrelist', 'movie_idmovie'),)


class Movie(models.Model):
    idmovie = models.BigIntegerField( db_column='idMovie', primary_key=True)  # Field name made lowercase.
    director_directorid = models.ForeignKey(Director, models.DO_NOTHING, db_column='Director_directorId', blank=True,
                                            null=True)  # Field name made lowercase.
    country = models.CharField(max_length=45, blank=True, null=True)
    title = models.CharField(max_length=100, blank=True, null=True)
    # language = models.CharField(max_length=45, blank=True, null=True)

    releasedate = models.TextField(db_column='releaseDate')  # Field name made lowercase. This field type is a guess.
    adult = models.IntegerField(null=True)
    poster = models.CharField(max_length=45, blank=True, null=True)
    overview = models.TextField(blank=True, null=True)
    budget = models.BigIntegerField(blank=True, null=True)
    revenue = models.BigIntegerField(blank=True, null=True)
    runtime = models.SmallIntegerField(blank=True, null=True)
    status = models.BooleanField(default = False)
    collectionid = models.ForeignKey("Collections", models.DO_NOTHING, db_column="Collections_idCollections", null=True)

    class Meta:
        managed = True
        db_table = 'movie'


class Images(models.Model):
    idimages = models.AutoField(db_column='idImages', primary_key=True)  # Field name made lowercase.
    movie_idmovie = models.ForeignKey('Movie', models.DO_NOTHING,
                                      db_column='Movie_idMovie')  # Field name made lowercase.
    backdrop = models.CharField(max_length=45)

    class Meta:
        managed = True
        db_table = 'images'


class Collections(models.Model):
    idcollections = models.AutoField(db_column='idCollections', primary_key=True)  # Field name made lowercase.
    name = models.CharField(db_column='Name', max_length=45, null=True)

    class Meta:
        managed = True
        db_table = 'collections'


class Companies(models.Model):
    idcompanies = models.AutoField(db_column='idCompany', primary_key=True)  # Field name made lowercase.
    name = models.CharField(db_column='Name', max_length=45, null=True)

    class Meta:
        managed = True
        db_table = 'companies'


class CompanyMovie(models.Model):
    companies_idcompanies = models.ForeignKey('Companies', models.DO_NOTHING,
                                              db_column='Companies_idCompany')  # Field name made lowercase.
    movie_idmovie = models.ForeignKey('Movie', models.DO_NOTHING,
                                      db_column='Movie_idMovie')  # Field name made lowercase.

    class Meta:
        managed = True
        db_table = 'companymovie'
        unique_together = (('companies_idcompanies', 'movie_idmovie'),)


class Cast(models.Model):
    movie_idmovie = models.ForeignKey('Movie', models.DO_NOTHING,
                                         db_column='Movie_idMovie',)  # Field name made lowercase.
    star_idstar = models.ForeignKey('Star', models.DO_NOTHING, db_column='Star_idStar')  # Field name made lowercase.

    class Meta:
        managed = True
        db_table = 'cast'
        unique_together = (('movie_idmovie', 'star_idstar'),)
