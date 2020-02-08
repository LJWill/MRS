import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';
import { media } from '../../utils';

const Form = styled.form`
    align-items: center;
    display: flex;
    margin: 0 px;
    width: 100vw;

    ${media.tablet`display: none;`};
`;

const Button = styled.button`
    color: #fff;
    border: none;
    background-color: black;
    height: 37px;
    width: 40px;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    font-size: 18px;
`;

const Input = styled.input`
    min-width: 50%;
    padding: 10px 15px;
    border: none;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    outline: none;
    font-size: 14px;
`;

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = { value: '' };
    }

    handleSubmit = e => {
        e.preventDefault();
        const { value } = this.state;
        console.log(this.props);
        this.props.history.push(`${process.env.PUBLIC_URL}/search/${value}`);
    };

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <Input
                    type="search"
                    placeholder="Search for a movie"
                    onChange={e => this.setState({ value: e.currentTarget.value })}
                />
                <Button>
                    <Icon name="search layout" />
                </Button>
            </Form>
        );
    }
}

export default withRouter(Search);
