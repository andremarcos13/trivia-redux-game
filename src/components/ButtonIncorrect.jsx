import React, { Component } from 'react';
import PropType from 'prop-types';
import '../styles/gameStyles.css';

export default class IncorrectButton extends Component {
  render() {
    const {
      index,
      disableButton,
      wasItAnswered,
      answers,
      youAnswered,
    } = this.props;
    return (
      <button
        name="inCorrect"
        id={ index }
        disabled={ disableButton }
        type="button"
        className={ wasItAnswered ? 'button-danger' : 'btn btn-primary' }
        data-testid={ `wrong-answer-${index}` }
        onClick={ youAnswered }
      >
        { answers }

      </button>
    );
  }
}

IncorrectButton.propTypes = {
  index: PropType.number.isRequired,
  disableButton: PropType.bool.isRequired,
  wasItAnswered: PropType.bool.isRequired,
  answers: PropType.string.isRequired,
  youAnswered: PropType.func.isRequired,
};
