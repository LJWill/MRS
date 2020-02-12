import React from 'react';
import styled from 'styled-components';
import SmallMovieCard from './SmallMovieCard';
import { Icon } from 'semantic-ui-react';
import _ from 'lodash';

const List = styled.section`
  flex-direction: column;
  display: flex;
`;

const MoviesWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  transform: ${p => `translate3d(${p.offset}px, 0px, 0px)`};
  transition: transform 0.6s;
  width: 100vw;
  overflow-x: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Title = styled.h2`
  color: #fff;
  text-align: left;
  height:50px
`;

const ButtonContainer = styled.div`
  align-self: center;
  position: absolute;
  height: 50px;
`;

const NavButton = styled.button`
  background-color: #222;
  border-radius: 50%;
  border: none;
  color: #fff;
  cursor: pointer;
  font-size: 18px;
  margin: 5px;
  padding: 15px 15px;
`;

class MovieList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { listOffset: 0 };
  }

  handleClick = direction => {
    console.log(direction);
    let listOffset;
    if (direction === 'right') {
      listOffset =
        this.state.listOffset > -3640 ? this.state.listOffset - 260 : 0;
    } else {
      listOffset =
        this.state.listOffset < 0 ? this.state.listOffset + 260 : -3640;
    }

    this.setState({ listOffset });
  };

  render() {
    const { movies } = this.props;

    return (
      <List>
        {/* <ButtonContainer>
          <NavButton onClick={() => this.handleClick('left')}>
            <Icon name="chevron left" />
          </NavButton>
          <NavButton onClick={() => this.handleClick('right')}>
            <Icon name="chevron right" />
          </NavButton>
        </ButtonContainer> */}
        <div style={{ overflow: 'hidden', padding: '10px' }}>
          <MoviesWrapper offset={this.state.listOffset}>
            {movies && movies.map(movie => (
              <SmallMovieCard {...movie} key={movie.id} onTop={this.props.onTop}/>
            ))}
          </MoviesWrapper>
        </div>
      </List>
    );
  }
}

export default MovieList;
