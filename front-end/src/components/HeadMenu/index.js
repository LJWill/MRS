import React from 'react';
import { Button, Container, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

let styles = {
  headerLink: {
    height: '100%'
  }
};

export default class extends React.Component {
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
        <Container>
          <Link to="/">
            <Menu.Item style={styles.headerLink} header>
              Home
            </Menu.Item>
          </Link>
          <Link to="/">
            <Menu.Item style={styles.headerLink} header>
              Movies
            </Menu.Item>
          </Link>
          <Link to="/">
            <Menu.Item style={styles.headerLink} header>
              About
            </Menu.Item>
          </Link>

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
