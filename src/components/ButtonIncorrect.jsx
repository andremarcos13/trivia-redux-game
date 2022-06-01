import React, { Component } from 'react';
import PropType from 'prop-types';

export default class IncorrectButton extends Component {
  render() {
    const {
      key,
      disableButton,
      wasItAnswered,
      answers,
      youAnswered,
    } = this.props;
    return (
      <button
        key={ key }
        disabled={ disableButton }
        type="button"
        className={ wasItAnswered ? 'button-danger' : 'btn btn-primary' }
        data-testid={ `wrong-answer-${key}` }
        onClick={ youAnswered }
      >
        { answers }

      </button>
    );
  }
}

IncorrectButton.propTypes = {
  key: PropType.number.isRequired,
  disableButton: PropType.bool.isRequired,
  wasItAnswered: PropType.bool.isRequired,
  answers: PropType.string.isRequired,
  youAnswered: PropType.func.isRequired,
};
