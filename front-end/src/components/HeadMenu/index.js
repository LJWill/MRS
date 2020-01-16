import React from 'react';
import { Button, Container, Menu, Input, Image, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import logo1 from '../../assets/images/movie_logo.png';
import logo2 from '../../assets/images/movie_logo2.png';
import MovieFilter from '../../components/MovieFilter';

let styles = {
  headerLink: {
    height: '100%'
  }
};

const InputExampleIconProps = () => (
  <Input
    icon={{ name: 'search', circular: true, link: true }}
    placeholder="Search..."
  />
);

export default class HeadMenu extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  triggerChildDrawer = (open) => {
    this.child.toggleDrawer(open);
  }

  render() {
    const { fixed, authenticated } = this.props;

    return (
      <Menu
        fixed={fixed ? 'top' : null}
        inverted={!fixed}
        pointing={!fixed}
        secondary={!fixed}
        size="large"
      >
        <MovieFilter onRef={ref => (this.child = ref)} />
        <Container>
          <Link to="/">
            <Menu.Item style={styles.headerLink} header>
              <Icon name="video camera layout" />
            </Menu.Item>
          </Link>
          <Link to="/">
            <Menu.Item style={styles.headerLink} header>
              Home
            </Menu.Item>
          </Link>
          <Link to="/movies">
            <Menu.Item style={styles.headerLink} header>
              Movies
            </Menu.Item>
          </Link>
          <Link to="/about">
            <Menu.Item style={styles.headerLink} header>
              About
            </Menu.Item>
          </Link>
          <Menu.Item
            style={styles.headerLink}
            header
            onClick={() => {
              this.triggerChildDrawer(true);
            }}
            onHover={() => {
              this.triggerChildDrawer(true);
            }}
          > 
            <Icon name="search layout" />
          </Menu.Item>

          {/* {fixed ? (
            <Menu.Item position="" header>
              <div class="ui icon input">
                <input type="text" placeholder="Search..." />
                <i
                  aria-hidden="true"
                  class="search inverted circular link icon"
                ></i>
              </div>
            </Menu.Item>
          ) : null} */}

          {authenticated ? (
            <Menu.Item
              position="right"
              header
              onClick={() => this.props.logout()}
            >
              Logout
            </Menu.Item>
          ) : (
            <Menu.Item position="right">
              <Button as="a" href="/login" inverted={!fixed}>
                Log in
              </Button>

              <Button
                as="a"
                href="/signup"
                inverted={!fixed}
                primary={fixed}
                style={{ marginLeft: '0.5em' }}
              >
                Sign Up
              </Button>
            </Menu.Item>
          )}
        </Container>
      </Menu>
    );
  }
}
