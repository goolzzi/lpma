import React, { Component } from 'react'
import styled, { css } from 'styled-components'
import { rgba } from 'polished'
import { capeCod, mantis, porsche, tonysPink, morningGlory, mako } from '../../styles/colors'

class Switch extends Component {


    state = {
        selected: this.props.value
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.value !== this.state.selected) {
            this.setState({ selected: nextProps.value })
        }
    }

    handleClick = type => {
        this.setState({ selected: type });
        this.props.onSwitchChange(type);
    }

    render() {
        const { selected } = this.state;
        const { labelLeft, labelRight } = this.props;

        return (
            <Container>
                <Button
                    data-selected={selected == 'monthly' ? true : false}
                    onClick={() => this.handleClick('monthly')}
                    >
                    {labelLeft}
                </Button>

                <Button
                    data-selected={selected == 'annual' ? true : false}
                    onClick={() => this.handleClick('annual')}
                    >
                    {labelRight}
                </Button>
            </Container>
        );
    }
}

const Container = styled.div`
    display: flex;
    border-radius: 4px;
    overflow: hidden;
`;

const Button = styled.div`
    height: 64px;
    width: 161px;

    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;
    transition: all 0.15s ease;

    font-family: 'DomaineSansMedium';
    text-transform: uppercase;
    color:  ${rgba('white', 0.5)};

    background: ${rgba(mako, 0.5)};

    &:hover {

    }

    &[data-selected='true'] {
        background: white;
        color: ${capeCod};
    }

`;

export default Switch;
