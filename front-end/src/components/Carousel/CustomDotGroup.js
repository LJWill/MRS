import PropTypes from "prop-types";
import { Dot } from "pure-react-carousel";
import React from "react";
import { Button, Container } from "semantic-ui-react";
import './index.css'

const CustomDotGroup = ({ slides, size }) => (
  <Container textAlign="center" className='custom-dot-group'>
    <Button.Group size={size}>
      {[...Array(slides).keys()].map(slide => (
        <Button as={Dot} key={slide} icon="circle" slide={slide} />
      ))}
    </Button.Group>
  </Container>
);

CustomDotGroup.defaultProps = {
  size: "mini"
};

CustomDotGroup.propTypes = {
  slides: PropTypes.number.isRequired,
  size: PropTypes.string
};

export default CustomDotGroup;
