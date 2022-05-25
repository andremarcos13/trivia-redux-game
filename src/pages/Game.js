import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';

class Game extends Component {
  // static propTypes = {
  //   second: third
  // }
  constructor() {
    super();
    this.state = {
      redirect: false,
      apiResponse: {},
    };
  }

  componentDidMount() { // valida token ao montar componente
    this.redirectIfInvalidToken();
  }

  fetchAPI = async () => { // pega API
    const token = localStorage.getItem('token');
    // const response = await fetch(`https://opentdb.com/api.php?amount=5&category=${ category }&difficulty=${ difficulty }&token=${ token }`);
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const result = await response.json();
    this.setState({
      apiResponse: result,
    });
  }

  redirectIfInvalidToken = () => {
    const { token } = this.props;
    const responseCode = Number(token.response_code);
    const CODE_THREE = 3;
    if (responseCode === CODE_THREE) {
      console.log('Seu token expirou!');
      this.setState({ redirect: true });
    } else {
      this.fetchAPI();
      this.setState({ redirect: false });
    }
  }

  questionMaker = () => {
    const { apiResponse } = this.state;
    const ZERO_DOT_FIVE = 0.5;
    const toRandomizeQuestion = [
      ...apiResponse.incorrect_answers,
      apiResponse.correct_answer,
    ];
    const ramdomQuestions = toRandomizeQuestion.sort(
      () => Math.random() - ZERO_DOT_FIVE,
    );
    
  }

  render() {
    const { redirect, apiResponse } = this.state;
    const { results } = apiResponse;
    const { category, question } = results;
    return (
      <>
        <Header />
        <main>
          <section>
            <div>
              <span data-testid="question-category">{ category }</span>
              <span data-testid="question-text">{ question }</span>
            </div>
            {/* <Timer /> */}
          </section>
          <section>
            {this.questionMaker()}
          </section>
        </main>
        { redirect && <Redirect to="/" /> }
      </>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  token: PropTypes.shape({
    response_code: PropTypes.number,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  token: state.returnToken,
});

// const mapDispatchToProps = {}

export default connect(mapStateToProps, null)(Game);
