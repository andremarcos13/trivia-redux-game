import React, { Component } from 'react';
import PropType from 'prop-types';
import '../styles/gameStyles.css';

export default class CorrectButton extends Component {
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
        index={ index }
        disabled={ disableButton }
        type="button"
        className={ wasItAnswered ? 'button-success' : 'btn btn-primary' }
        data-testid="correct-answer"
        onClick={ youAnswered }
      >
        { answers }

      </button>
    );
  }
}

CorrectButton.propTypes = {
  index: PropType.number.isRequired,
  disableButton: PropType.bool.isRequired,
  wasItAnswered: PropType.bool.isRequired,
  answers: PropType.string.isRequired,
  youAnswered: PropType.func.isRequired,
};
