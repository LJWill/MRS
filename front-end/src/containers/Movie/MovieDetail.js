import React from 'react';
import { Container, Divider, Grid, Header, Icon,  } from 'semantic-ui-react';
import HeadMenu from '../../components/HeadMenu/index';
import ParallaxBanner from '../../components/ParallaxBanner';

import './index.css';

const movieData = {
  adult: false,
  backdrop_path: '/jOzrELAzFxtMx2I4uDGHOotdfsS.jpg',
  belongs_to_collection: {
    id: 10,
    name: 'Star Wars Collection',
    poster_path: '/iTQHKziZy9pAAY4hHEDCGPaOvFC.jpg',
    backdrop_path: '/d8duYyyC9J5T825Hg7grmaabfxQ.jpg'
  },
  budget: 250000000,
  genres: '',
  homepage:
    'https://www.starwars.com/films/star-wars-episode-ix-the-rise-of-skywalker',
  id: 181812,
  imdb_id: 'tt2527338',
  original_language: 'en',
  original_title: 'Star Wars: The Rise of Skywalker',
  overview:
    'The surviving Resistance faces the First Order once again as the journey of Rey, Finn and Poe Dameron continues. With the power and knowledge of generations behind them, the final battle begins.',
  popularity: 214.921,
  poster_path: '/db32LaOibwEliAmSL2jjDF6oDdj.jpg',
  production_companies: '',
  production_countries: '',
  release_date: '2019-12-18',
  revenue: 956030690,
  runtime: 142,
  spoken_languages: '',
  status: 'Released',
  tagline: 'Every generation has a legend',
  title: 'Star Wars: The Rise of Skywalker',
  video: false,
  vote_average: 6.6,
  vote_count: 2464
};

class MovieDetail extends React.Component {
  render() {
    const MOVIE_DB_IMAGE_URL =
      'https://image.tmdb.org/t/p/original/eQs5hh9rxrk1m4xHsIz1w11Ngqb.jpg';

    return (
      <div
        // className="movie-backdrop"
        // style={{
        //   backgroundSize: 'cover',
        //   backgroundImage: `linear-gradient(rgba(0,0,0,.5), rgba(0,0,0, .5)), url("${MOVIE_DB_IMAGE_URL}")`,
        //   width: '100vw',
        //   height: '100vh'
        // }}
      >
        <style>
          {`
        html, body {
          background-color: #252839 !important;
        }
      `}
        </style>

        <HeadMenu />
        
        <ParallaxBanner />

        <div />
      </div>
    );
  }
}

export default MovieDetail;
