import React from 'react';

import P from 'prop-types';

import './styles.css';

import { Component } from "react";

export class Button extends Component {
    render() {
        //Obtendo o valor da propriedade text do button do arquivo da home
        const { text, onClick, disabled = false } = this.props;

        //Inserindo o valor da propridade no botão em si
        return (
            <button
                className='button'
                onClick  ={onClick}
                disabled ={disabled}
            >
                <span className='text-button'>{ text }</span>
            </button>
        );
    }
}

// Tipando as Props

Button.defaultProps = {
  disabled: false,
}

Button.propTypes = {
  text:     P.string.isRequired,
  onClick:  P.func.isRequired,
  disabled: P.bool,
};
