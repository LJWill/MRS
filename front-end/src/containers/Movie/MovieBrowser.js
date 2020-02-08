import React from 'react';
import _ from 'lodash';
import { Container, Divider, Grid, Header, Icon } from 'semantic-ui-react';
import HeadMenu from '../../components/HeadMenu/index';
import MyTabs from '../../components/Tab';
import MovieCard from '../../components/MovieCard';
import Nav from '../../components/HeadMenu/Nav';

import { Sortable } from 'react-sortable';
import FlipMove from 'react-flip-move';
import './MovieBrowser.scss';

export default class GridLayout extends React.Component {
  // render() {
  //   return (
  //     <Container>
  //       <style>
  //         {`
  //     html, body {
  //       background-color: #252839 !important;
  //     }
  //     p {
  //       align-content: center;
  //       // background-color: #495285;
  //       display: flex;
  //       flex-direction: column;
  //       justify-content: center;
  //       min-height: 6em;
  //     }
  //     p > span {
  //       opacity: 0.4;
  //       text-align: center;
  //     }
  //   }
  //   `}
  //       </style>

  //       <HeadMenu />
  //       <Divider />

  //       {/* <MyTabs /> */}

  //       <Header as="h2" inverted textAlign="center">
  //         Movie List
  //       </Header>

  //       <Divider />

  //       <FlipMove>
  //         <Grid container columns={4}>
  //           <Grid.Column>
  //             <MovieCard movie_id={1} />
  //           </Grid.Column>
  //           <Grid.Column>
  //             <MovieCard movie_id={2} />
  //           </Grid.Column>
  //           <Grid.Column>
  //             <MovieCard movie_id={3} />
  //           </Grid.Column>
  //           <Grid.Column>
  //             <MovieCard movie_id={4} />
  //           </Grid.Column>
  //           <Grid.Column>
  //             <MovieCard movie_id={5} />
  //           </Grid.Column>
  //           <Grid.Column>
  //             <MovieCard movie_id={6} />
  //           </Grid.Column>
  //           <Grid.Column>
  //             <MovieCard movie_id={7} />
  //           </Grid.Column>
  //         </Grid>
  //       </FlipMove>
  //     </Container>
  //   );
  // }

  constructor(props) {
    super(props);

    this.state = {
      items: {
        A: { selected: false },
        B: { selected: false },
        C: { selected: false },
        D: { selected: false },
        E: { selected: false },
        F: { selected: false },
        G: { selected: false },
        H: { selected: false },
        I: { selected: false },
        J: { selected: false },
        K: { selected: false },
        L: { selected: false },
        M: { selected: false },
        N: { selected: false },
        O: { selected: false },
        P: { selected: false },
        Q: { selected: false },
        R: { selected: false },
        S: { selected: false },
        T: { selected: false },
        U: { selected: false },
        V: { selected: false },
        W: { selected: false },
        X: { selected: false },
        Y: { selected: false },
        Z: { selected: false }
      }
    };
  }

  selectItem(key) {
    this.setState({
      items: {
        ...this.state.items,
        [key]: { selected: !this.state.items[key].selected }
      }
    });
  }

  renderItem(key) {
    return (
      <div className="utem" onClick={() => this.selectItem(key)} key={key}>
        {key}
      </div>
    );
  }

  render() {
    const { selected, items } = this.state;

    const selectedKeys = Object.keys(items).filter(key => items[key].selected);
    const remainingKeys = Object.keys(items).filter(
      key => !items[key].selected
    );

    return (
      <div>
        <Nav />
        {/* <HeadMenu /> */}

        <Container className="movieContainer">
          {/* <MyTabs /> */}
          {/* <Header as="h2" inverted textAlign="center">
          Movie List
        </Header> */}
          <Divider />

          <hr />
          <FlipMove className="selected">
            {selectedKeys.length === 0 && (
              <div className="placeholder">Please select an item below</div>
            )}
            {selectedKeys.map(key => this.renderItem(key))}
          </FlipMove>
          <hr />

          <FlipMove
            className="items"
            duration={350}
            staggerDurationBy={20}
            staggerDelayBy={20}
          >
            <FlipMove>
              {Object.keys(items)
                // .filter(key => !items[key].selected)
                .map(key => this.renderItem(key))}
            </FlipMove>
          </FlipMove>
        </Container>
      </div>
    );
  }
}

// const mapStateToProps = ({ movieDetails, auth, watchList }) => ({
//   movie: movieDetails.movie
// })

// const mapDispatchToProps = dispatch => ({
//   getMovie: id => dispatch(actions.getMovie(id))
// })
