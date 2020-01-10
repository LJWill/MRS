import os
import django
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
            try:
                movies.Movie.objects.get(idmovie=row["id"])
                continue
            except:
                new_movie = movies.Movie.objects.create(idmovie=row["id"])

                new_movie.title = row["title"]

                adult = row["adult"]
                if not adult:
                    new_movie.adult = 0
                else:
                    new_movie.adult = 1
                new_movie.budget = row["budget"]

                genres = row["genres"]
                if not pd.isnull(genres):
                    genres =genres.split(",")
                    for genre in genres:
                        self.writegenre(new_movie, self.writegenrelist(genre))

                companies = row["production_companies"]
                if not pd.isnull(companies):
                    companies = companies.split(",")
                    for company in companies:
                        self.writeCompanyMovie(new_movie, self.writeCompany(company))

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
            if department == "Acting":
                try:
                    movies.Star.objects.get(idstar=row["id"])
                    continue
                except:
                    new_person = movies.Star.objects.create(idstar=row["id"])
            elif department == "Directing":
                try:
                    movies.Director.objects.get(iddirector=row["id"])
                    continue
                except:
                    new_person = movies.Director.objects.create(iddirector=row["id"])
            else:
                try:
                    movies.Writer.objects.get(idwriter=row["id"])
                    continue
                except:
                    new_person = movies.Writer.objects.create(idwriter=row["id"])

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

    def writeimage(self,read_path):
        raw = pd.read_csv(read_path)
        count = 1
        total = raw.shape[0]
        for index, row in raw.iterrows():

            print("\r" + 'processing %d out of %d items...' % (count, total), end='')
            try:
                movies.Images.objects.get(backdrop=row["backdrop"],movie_idmovie=row["id"])
            except:
                new_image = movies.Images.objects.create(backdrop=row["backdrop"],movie_idmovie=row["id"])
                new_image.save()

    # def writeCast(self, read_path):
    #     raw = pd.read_csv(read_path)
    #     count = 1
    #     total = raw.shape[0]
    #     for index, row in raw.iterrows():
    #         star = movies.Star.objects.get()
    #         try:
    #             movies.Cast.objects.get(star_idstar=star, movie_idmovie=movie)
    #         except:
    #             new_cast = movies.Cast.objects.create(star_idstar=star, movie_idmovie=movie)
    #             new_cast.save()


    def writegenrelist(self, genrename):
        try:
            genre = movies.Genrelist.objects.get(genrename=genrename)
            return genre
        except:
            new_genre = movies.Genrelist.objects.create()
            new_genre.genrename = genrename
            new_genre.save()
            return new_genre

    def writegenre(self, movie, genrelist):
        try:
            movies.Genre.objects.get(genrelist_idgenrelist=genrelist, movie_idmovie=movie)
        except:
            new_genere = movies.Genre.objects.create(genrelist_idgenrelist=genrelist, movie_idmovie=movie)
            new_genere.save()



    def writeImage(self, backdrop, movie):
        try:
            movies.Images.objects.get(movie_idmovie=movie, backdrop=backdrop)
        except:
            new_images = movies.Images.objects.create(movie_idmovie=movie, backdrop=backdrop)
            new_images.save()

    def writeCompany(self, companyname):
        try:
            company = movies.Companies.objects.get(name=companyname)
            return company
        except:
            new_company = movies.Companies.objects.create()
            new_company.name = companyname
            new_company.save()
            return new_company

    def writeCompanyMovie(self, movie, companies):
        try:
            movies.CompanyMovie.objects.get(companies_idcompanies=companies, movie_idmovie=movie)
        except:
            new_genere = movies.CompanyMovie.objects.create(companies_idcompanies=companies, movie_idmovie=movie)
            new_genere.save()

    def writeCollections(self, collection):
        try:
            collection = movies.Collections.objects.get(name =collection)
            return collection
        except:
            new_collection = movies.Collections.objects.create()
            new_collection.name = collection
            new_collection.save()
            return new_collection


if __name__ == '__main__':
    ld = LoadingData()
    read_path = 'movieinfo/result.csv'
    ld.writeMovie(read_path)
