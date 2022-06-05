import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Ranking extends Component {
  render() {
    const { history } = this.props;
    const getRanking = JSON.parse(localStorage.getItem('ranking'));
    // const objRanking = Object.keys(getRanking);
    console.log(getRanking.name);
    console.log(getRanking);

    return (
      <div>
        <h1 data-testid="ranking-title">
          Ranking
        </h1>
        <div>
          {/* { Object.keys(getRanking).map((elem, index) => (
            <div key={ index }>
              <span>
                {elem.name}
              </span>
              <span>
                {elem.score}
              </span>
              <span>
                {elem.playerPhoto}
              </span>
            </div>
          )) } */}
          <p>
            {getRanking.name}
            <br />
          </p>
          <p>
            {getRanking.score}
            <br />
          </p>
          <p>
            {getRanking.playerPhoto}
            <br />
          </p>
        </div>
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
