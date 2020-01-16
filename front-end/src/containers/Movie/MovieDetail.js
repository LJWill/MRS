import React from 'react';

class MovieDetail extends React.Component {
  render() {
    return (
      <div>
        <div
          className="movie-backdrop w-100 h-100 position-fixed fixed-top"
          style={{
            backgroundSize: 'cover',
            backgroundImage: `linear-gradient(rgba(0,0,0,.5), rgba(0,0,0, .5)), url("${MOVIE_DB_IMAGE_URL.large +
              movieData.backdrop_path}")`
          }}
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
