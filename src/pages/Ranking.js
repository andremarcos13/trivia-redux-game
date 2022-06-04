import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Ranking extends Component {
  render() {
    const { history } = this.props;

    return (
      <div>
        <h1 data-testid="ranking-title">
          Ranking
        </h1>
        <button
          type="button"
          onClick={ () => history.push('/') }
          data-testid="btn-go-home"
        >
          Voltar para tela incial
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
};
Ranking.defaultProps = {
  history: null,
};
export default Ranking;
