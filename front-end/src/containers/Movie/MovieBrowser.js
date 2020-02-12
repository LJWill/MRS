import React from 'react';
import _ from 'lodash';
import shuffle from 'lodash/shuffle';
import { Container, Divider, Grid, Header, Icon } from 'semantic-ui-react';
import MidMovieCard from '../../components/MovieList/MidMovieCard';
import Nav from '../../components/HeadMenu/Nav';
import { connect } from 'react-redux';
import { Flipper, Flipped } from 'react-flip-toolkit';

import FlipMove from 'react-flip-move';
import './MovieBrowser.scss';

class MovieBrowser extends React.Component {
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

    console.log('[[[[[[[[[[[[', this.props);
    const selectedKeys = Object.keys(items).filter(key => items[key].selected);
    const remainingKeys = Object.keys(items).filter(
      key => !items[key].selected
    );

    return (
      <div>
        <Nav />

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

const letters = 'reactfliptoolkit'.split('');

const entries = [
  [
    [0, 1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12, 13, 14, 15]
  ],
  // catlike fort pilot
  [
    [3, 2, 4, 6, 7, 13, 1],
    [5, 10, 0, 9],
    [8, 14, 12, 11, 15]
  ],
  // fickle lotto tapir
  [
    [5, 7, 3, 13, 6, 1],
    [12, 10, 4, 9, 11],
    [15, 2, 8, 14, 0]
  ],
  [
    [0, 1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12, 13, 14, 15]
  ]
];

const colors = ['#ff4f66', '#7971ea', '#5900d8'];
const getColor = letter => {
  if (letter < 5) return colors[0];
  else if (letter < 9) return colors[1];
  else return colors[2];
};

class Example extends React.Component {
  index = 0;
  state = {
    expanded: false,
    movies: null
  };

  shuffleMovie = () => {
    this.setState({
      movies: _.shuffle(this.state.movies),
      expanded: !this.state.expanded
    });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.movies !== this.props.movies) {
      // get now playing movies
      this.setState({ movies: nextProps.movies[0].now_playing });
    }
  }

  render() {
    const data = entries[this.index % entries.length];
    this.index += 1;

    let { movies } = this.state;

    console.log('----------->', this.state.expanded);

    return (
      <div>
        <Nav />
        <Container className="movieContainer">
          <Flipper flipKey={this.state.expanded} spring="gentle">
            {/* <main onClick={() => this.setState({ expanded: !this.state.expanded })}>
          <Expanded data={data} />
        </main> */}

            {movies && (
              <Grid container columns={5}>
                <MovieView data={movies} func={this.shuffleMovie} />
              </Grid>
            )}
          </Flipper>
        </Container>
      </div>
    );
  }
}

const MovieView = data => {
  return data.data.map(m => (
    <Flipped flipId={m.id} >
      <Grid.Column>
        <MidMovieCard {...m} key={m.id} shuffleMovie={data.func} />
      </Grid.Column>
    </Flipped>
  ));
};

const Word = ({ word }) => {
  return (
    <ul className="expandedList">
      {word.map(index => {
        const letter = letters[index];
        const flipId = `letter-${index}`;
        return (
          <Flipped flipId={flipId}>
            <li
              style={{
                backgroundColor: getColor(index)
              }}
            >
              <Flipped inverseFlipId={flipId} scale transformOrigin="50% 50%">
                <span>{letter}</span>
              </Flipped>
            </li>
          </Flipped>
        );
      })}
    </ul>
  );
};

const Expanded = ({ data }) => {
  return (
    <div className="expandedContainer">
      {data.map(word => (
        <Word word={word} />
      ))}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    genres: state.movieBrowser.genres,
    movies: state.movieBrowser.movies
  };
};

export default connect(mapStateToProps)(Example);
