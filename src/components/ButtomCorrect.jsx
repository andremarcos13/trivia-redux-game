import React, { Component } from 'react';
import PropType from 'prop-types';

export default class CorrectButton extends Component {
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
  key: PropType.number.isRequired,
  disableButton: PropType.bool.isRequired,
  wasItAnswered: PropType.bool.isRequired,
  answers: PropType.string.isRequired,
  youAnswered: PropType.func.isRequired,
};
