import os
import django
from django.db import transaction


os.environ.setdefault("DJANGO_SETTINGS_MODULE", "movie.settings")
django.setup()
import pandas as pd
from movieinfo import models as movies


class LoadingData:
    def writeMovie(self, read_path):
        raw = pd.read_csv(read_path)
        count = 1
        total = raw.shape[0]
        for index, row in raw.iterrows():
            print("\r" + 'processing %d out of %d items...' % (count, total), end='')
            count += 1
            with transaction.atomic():

                try:
                    movies.Movie.objects.get(idmovie=int(row["id"]))
                    continue
                except:
                    new_movie = movies.Movie.objects.create(idmov1e=row["id"])

                    new_movie.title = row["title"]

                    adult = row["adult"]
                    if not adult:
                        new_movie.adult = 0
                    else:
                        new_movie.adult = 1
                    new_movie.budget = row["budget"]

                    genres = row["genres"]
                    if not pd.isnull(genres):
                        genres = genres.split(",")
                        for genre in genres:
                            new_movie.genre.add(self.writegenre(genre))

                    companies = row["production_companies"]
                    if not pd.isnull(companies):
                        companies = companies.split(",")
                        for company in companies:
                            new_movie.company.add(self.writeCompany(company))

                    overview = row["overview"]
                    if not pd.isnull(overview):
                        new_movie.overview = overview

                    poster = row["poster_path"]
                    if not pd.isnull(poster):
                        new_movie.poster = poster

                    runtime = row["runtime"]
                    if not pd.isnull(runtime):
                        new_movie.runtime = runtime

                    country = row["production_countries"]
                    if not pd.isnull(country):
                        new_movie.country = country

                    releasedate = row["release_date"]
                    if not pd.isnull(releasedate):
                        new_movie.releasedate = releasedate

                    collectionname = row["belongs_to_collection"]
                    if not pd.isnull(collectionname):
                        new_movie.collectionid = self.writeCollections(collectionname)

                    new_movie.revenue = row["revenue"]
                    if row["status"] == "Released":
                        new_movie.status = True
                    new_movie.save()

    def writeStuff(self, read_path):
        raw = pd.read_csv(read_path)
        count = 1
        total = raw.shape[0]
        for index, row in raw.iterrows():

            print("\r" + 'processing %d out of %d items...' % (count, total), end='')
            count += 1
            department = row["known_for_department"]
            try:
                movies.People.objects.get(idperson=row["id"])
                continue
            except:
                new_person = movies.People.objects.create(idperson=row["id"])
            with transaction.atomic():
                new_person.name = row["name"]
                gender = row["gender"]
                if gender == 0:
                    new_person.gender = "notspecified"
                elif gender == 1:
                    new_person.gender = "female"
                else:
                    new_person.gender = "male"
                birthday = row["birthday"]
                if not pd.isnull(birthday):
                    new_person.birthday = birthday

                deathday = row["deathday"]
                if not pd.isnull(deathday):
                    new_person.deathday = deathday

                placeofbirth = row["place_of_birth"]
                if not pd.isnull(placeofbirth):
                    new_person.birthplace = placeofbirth

                biography = row["biography"]
                if not pd.isnull(biography):
                    new_person.biography = biography

                profile_path = row["profile_path"]
                if not pd.isnull(profile_path):
                    new_person.profileimage = profile_path

                new_person.save()

    def writeimage(self, read_path):
        raw = pd.read_csv(read_path)
        count = 1
        total = raw.shape[0]
        for index, row in raw.iterrows():
            print("\r" + 'processing %d out of %d items...' % (count, total), end='')
            count += 1
            try:
                movie = movies.Movie.objects.get(idmovie=row["id"])
            except:
                continue
            try:
                movies.Images.objects.get(backdrop=row["backdrop"], movie_idmovie=movie)
            except:
                with transaction.atomic():
                    backdrops = row["backdrops"]
                    if not pd.isnull(backdrops):
                        backdrops = backdrops.split(',')
                        for backdrop in backdrops:
                            new_image = movies.Images.objects.create(backdrop=backdrop, movie_idmovie=movie)
                            new_image.save()

    def writeCast(self, read_path):
        raw = pd.read_csv(read_path)
        count = 1
        total = raw.shape[0]
        for index, row in raw.iterrows():
            print("\r" + 'processing %d out of %d items...' % (count, total), end='')
            count += 1
            try:
                movie = movies.Movie.objects.get(idmovie=row["id"])
            except:
                continue
            with transaction.atomic():
                directors = row["director"]
                if not pd.isnull(directors):
                    directors = directors.split(",")
                    for director in directors:
                        try:
                            directorobj = movies.People.objects.get(idperson=director)
                            movie.directors.add(directorobj)
                        except:
                            print("Director Not existing")

                stars = row["cast"]
                if not pd.isnull(stars):
                    stars = stars.split(",")
                    for star in stars:
                        try:
                            starobj = movies.People.objects.get(idperson=star)
                        except:
                            continue
                        movie.casts.add(starobj)

    def writeRatings(self, read_path):
        raw = pd.read_csv(read_path)
        count = 1
        total = raw.shape[0]
        for index, row in raw.iterrows():
            print("\r" + 'processing %d out of %d items...' % (count, total), end='')
            count += 1
            try:
                movie = movies.Movie.objects.get(idmovie=row["movieId"])
            except:
                continue
            try:
                user = movies.User.objects.get(iduser=row["userId"])
            except:
                user = movies.User.objects.create(iduser=row["userId"])
            try:
                with transaction.atomic():
                    new_rating = movies.Ratings.objects.create(movie_idmovie=movie, user_iduser=user)
                    new_rating.rating = int(row["rating"] * 2)
                    new_rating.save()
            except:
                continue

    def writegenre(self, genrename):
        try:
            genre = movies.Genre.objects.get(genrename=genrename)
            return genre
        except:
            with transaction.atomic():
                new_genre = movies.Genre.objects.create()
                new_genre.genrename = genrename
                new_genre.save()
            return new_genre

    def writeImage(self, backdrop, movie):
        try:
            movies.Images.objects.get(movie_idmovie=movie, backdrop=backdrop)
        except:
            with transaction.atomic():
                new_images = movies.Images.objects.create(movie_idmovie=movie, backdrop=backdrop)
                new_images.save()

    def writeCompany(self, companyname):
        try:
            company = movies.Companies.objects.get(name=companyname)
            return company
        except:
            with transaction.atomic():
                new_company = movies.Companies.objects.create()
                new_company.name = companyname
                new_company.save()
            return new_company

    def writeCollections(self, collection):
        try:
            collection = movies.Collections.objects.get(name=collection)
            return collection
        except:
            with transaction.atomic():
                new_collection = movies.Collections.objects.create()
                new_collection.name = collection
                new_collection.save()
            return new_collection


if __name__ == '__main__':
    ld = LoadingData()

    read_path = './DataCollection/MovieInfo/Data/people.csv'
    ld.writeStuff(read_path)

    read_path = './DataCollection/MovieInfo/Data/movieDetails.csv'
    ld.writeMovie(read_path)

    read_path = './DataCollection/MovieInfo/Data/casts.csv'
    ld.writeCast(read_path)

    read_path = './DataCollection/MovieInfo/Data/movieImages.csv'
    ld.writeimage(read_path)

    read_path = './DataCollection/MovieInfo/Data/ratingResults.csv'
    ld.writeRatings(read_path)
