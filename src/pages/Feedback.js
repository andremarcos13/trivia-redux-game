import React, { Component } from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';

class Feedback extends Component {
  render() {
    const numeroDeRespostas = 3;
    const { login, score, assertions, history } = this.props;
    console.log('login', login);
    console.log('score', score);
    console.log('assertions', assertions);

    return (
      <header>
        <div>
          <img
            src={ login }
            data-testid="header-profile-picture"
            alt="gravatar profile"
          />
          <p data-testid="header-player-name">{ login }</p>
          <p id="score" data-testid="header-score">{ score }</p>
        </div>

        <section>
          {
            assertions <= numeroDeRespostas ? (
              <h1 data-testid="feedback-text">Could be better...</h1>
            ) : (
              <h1 data-testid="feedback-text">Well Done!</h1>
            )
          }
        </section>

        <section>
          <h1 data-testid="feedback-total-score">
            { score }
          </h1>
          <p data-testid="feedback-total-question">
            { assertions }
          </p>
        </section>

        <section>
          <button
            type="button"
            onClick={ () => history.push('/') }
            data-testid="btn-play-again"
          >
            Play Again
          </button>
        </section>

        <section>
          <button
            type="button"
            onClick={ () => history.push('/Ranking') }
            data-testid="btn-ranking"
          >
            Ranking
          </button>
        </section>
      </header>
    );
  }
}

Feedback.propTypes = {
  gravatar: Proptypes.string,
  score: Proptypes.string,
  assertions: Proptypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  login: state.login,
  score: state.score,
  assertions: state.assertions,
});
export default connect(mapStateToProps, null)(Feedback);
