import React from 'react';
import { Container, Divider, Grid, Header, Icon } from 'semantic-ui-react';


const movieData = {
    adult: false,
    backdrop_path: "/jOzrELAzFxtMx2I4uDGHOotdfsS.jpg",
    belongs_to_collection: {id: 10, name: "Star Wars Collection", poster_path: "/iTQHKziZy9pAAY4hHEDCGPaOvFC.jpg", backdrop_path: "/d8duYyyC9J5T825Hg7grmaabfxQ.jpg"},
    budget: 250000000,
    genres: "",
    homepage: "https://www.starwars.com/films/star-wars-episode-ix-the-rise-of-skywalker",
    id: 181812,
    imdb_id: "tt2527338",
    original_language: "en",
    original_title: "Star Wars: The Rise of Skywalker",
    overview: "The surviving Resistance faces the First Order once again as the journey of Rey, Finn and Poe Dameron continues. With the power and knowledge of generations behind them, the final battle begins.",
    popularity: 214.921,
    poster_path: "/db32LaOibwEliAmSL2jjDF6oDdj.jpg",
    production_companies: "",
    production_countries: "",
    release_date: "2019-12-18",
    revenue: 956030690,
    runtime: 142,
    spoken_languages: "",
    status: "Released",
    tagline: "Every generation has a legend",
    title: "Star Wars: The Rise of Skywalker",
    video: false,
    vote_average: 6.6,
    vote_count: 2464,
}

class MovieDetail extends React.Component {

  render() {
    return (
      <div>
        <div
          className="movie-backdrop w-100 h-100 position-fixed fixed-top"
        //   style={{
        //     backgroundSize: 'cover',
        //     backgroundImage: `linear-gradient(rgba(0,0,0,.5), rgba(0,0,0, .5)), url("${MOVIE_DB_IMAGE_URL.large +
        //       movieData.backdrop_path}")`
        //   }}
        />

        <Container className="d-flex flex-column">
          <div className="movie">
            <img
            //   src={`${MOVIE_DB_IMAGE_URL.medium + movieData.poster_path}`}
              alt={movieData.title}
              className="movie__img"
            />

            <div className="movie__info d-flex flex-column justify-content-between p-3 align-items-start">
              <h2>{movieData.title}</h2>
              {/* {movieData.tagline && (
                <h6 className="movie__tagline">{movieData.tagline}</h6>
              )} */}
              <div className="movie__control">
                <div title="Rating" className="movie__rating">
                  {/* {movieData.vote_average} */}
                </div>
                {/* <WatchListButton movie={movieData} /> */}
              </div>
              <p className="movie__overview">movieData.overview</p>

              <div>
                <span className="mr-2">Genres:</span>{' '}
                {/* {movieData.genres.map(o => (
                  <Badge color="warning" className="mb-1" key={`g${o.id}`}>
                    {o.name}
                  </Badge>
                ))} */}
              </div>
            </div>

            <div className="movie__stat d-flex justify-content-between align-items-center">
              {/* {movieData.release_date && (
                <div>
                  <i className="fa fa-clock-o movie__icon" />
                  Release date: {this.getReleaseDateStr(movieData.release_date)}
                </div>
              )} */}
            </div>

            
          </div>

          {/* <ActorList />
          <ImageList />
          <Recommendations /> */}


        </Container>
      </div>
    );
  }
}

export default MovieDetail;
