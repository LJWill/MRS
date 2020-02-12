import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faEye } from '@fortawesome/free-regular-svg-icons';
import { urlTitle, addToList, isSaved, removeFromList } from '../../utils';
import config from '../../config';
import { GenericButton, PrimaryButton } from './Button';
import { Button, Icon } from 'semantic-ui-react';

const Poster = styled.div`
  background-color: #fff;
  background-image: url(${p => `${p.bg}`});
  background-repeat: no-repeat;
  background-size: cover;
  background: linear-gradient(url(${p => `${p.bg}`}), 50%, transparent);
  height: 100%;
  position: absolute;
  transition: 0.8s;
  width: 100%;
  z-index: -2;
  opacity: ${ p => p.onTop ?  '1' : '0.3' };
`;

const Content = styled.div`
  align-items: center;
  display: none;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  padding: 10px;
  position: absolute;
  text-align: center;
  width: 100%;

  ${Button} {
    margin: 5px 0;
  }
`;

const Wrapper = styled.article`
  border: 2px solid transparent;
  color: #ddd;
  flex-shrink: 0;
  height: 160px;
  margin: 5px;
  position: relative;
  transition: border 0.2s;
  width: 100px;
  transition: all 0.6s;

//   &:hover {
//     border: 2px solid #ddd;

//     ${Poster} {
//       filter: blur(10px);
//     }

//     ${Content} {
//       display: flex;
//     }

//     &:before {
//       background-color: #000;
//       content: '';
//       height: 100%;
//       left: 0;
//       opacity: 0.5;
//       position: absolute;
//       top: 0;
//       width: 100%;
//       z-index: -1;
//     }
//   }
`;

export default class Movie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSaved: isSaved(props),
      style: { opacity: 1, transform: 'rotateY(0)' }
    };
  }

  add = movie => {
    console.log('clicked!');
    this.props.shuffleMovie();
  };

  remove = movie => {
    removeFromList(movie);
    this.setState({ isSaved: false });
    if (this.props.inFavorites) {
      this.setState(
        { style: { opacity: 0, transform: 'rotateY(70deg)' } },
        () => {
          setTimeout(() => {
            this.props.removeFromFavorites(movie.id);
          }, 500);
        }
      );
    }
  };

  render() {
    const { title, poster_path, onTop } = this.props;

    return (
      <Wrapper style={this.state.style}>
        <Content>
          <h3>{title}</h3>

        </Content>
        <Poster bg={`${config.medium}${poster_path}`} onTop={onTop}/>
      </Wrapper>
    );
  }
}
