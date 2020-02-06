import React from 'react';
import { Container, Divider, Grid, Header, Icon } from 'semantic-ui-react';
import HeadMenu from '../../components/HeadMenu/index';
import MyTabs from '../../components/Tab';
import MovieCard from '../../components/MovieCard';

const AnotherGridLayout = () => (
  <Container>
    <style>
      {`
      html, body {
        background-color: #252839 !important;
      }
      p {
        align-content: center;
        // background-color: #495285;
        display: flex;
        flex-direction: column;
        justify-content: center;
        min-height: 6em;
      }
      p > span {
        opacity: 0.4;
        text-align: center;
      }
    }
    `}
    </style>

    <HeadMenu />
    <Divider />

    <MyTabs />

    <Header as="h2" inverted textAlign="center">
      Movie List
    </Header>

    <Divider />

    <Grid container columns={4}>
      <Grid.Column>
        <MovieCard movie_id={1} />
      </Grid.Column>
      <Grid.Column>
        <MovieCard movie_id={2} />
      </Grid.Column>
      <Grid.Column>
        <MovieCard movie_id={3} />
      </Grid.Column>
      <Grid.Column>
        <MovieCard movie_id={4} />
      </Grid.Column>
      <Grid.Column>
        <MovieCard movie_id={5} />
      </Grid.Column>
    </Grid>
  </Container>
);

// const mapStateToProps = ({ movieDetails, auth, watchList }) => ({
//   movie: movieDetails.movie
// });

// const mapDispatchToProps = dispatch => ({
//   getMovie: id => dispatch(actions.getMovie(id))
// });

export default AnotherGridLayout;
