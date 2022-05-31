import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import { fetchAPI } from '../redux/actions/gameStart';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      redirect: false,
      questionsCount: 0,
    };
  }

  async componentDidMount() {
    console.log('ola, mundo'); // valida token ao montar componente
    const { dispatch } = this.props;
    const chave = localStorage.getItem('token');
    await dispatch(fetchAPI(chave));
  }

  componentDidUpdate() {
    this.redirectIfInvalidToken();
  }

  redirectIfInvalidToken = () => {
    const { tokenResponse } = this.props;
    const responseCode = tokenResponse.response_code;
    if (responseCode !== 0) {
      localStorage.removeItem('token');
      this.setState({
        redirect: true,
      });
    }
  }

  ramdomizerAnswers = () => {
    const { questionsCount } = this.state;
    const { toAsk } = this.props;
    const { questions } = toAsk;
    const { results } = questions;
    const question = results[questionsCount];
    const ZERO_DOT_FIVE = 0.5;
    const toRandomizeAnswers = [
      ...question.incorrect_answers,
      question.correct_answer,
    ];
    const ramdomAnswers = toRandomizeAnswers.sort(
      () => Math.random() - ZERO_DOT_FIVE,
    );
    return ramdomAnswers;
  }

  youAnsweredCorrectly = () => {

  }

  render() {
    const { redirect, questionsCount } = this.state;
    const { toAsk } = this.props;
    const { questions } = toAsk;
    const { results } = questions;
    console.log(results);
    if (typeof results === 'undefined') {
      return 'deu ruim';
    }
    const query = results[questionsCount];
    console.log(query);
    const { category, question } = query;
    return (
      <>
        { redirect && <Redirect to="/" /> }
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
            {this.ramdomizerAnswers().map((answers, index) => (
              <button
                key={ index }
                type="button"
                data-testid={ () => {
                  if (answers === query.correct_answer) {
                    return 'correct-answer';
                  }
                  return `wrong-answer-${index}`;
                } }
                // onClick={ () => {
                //   if (answers === query.correct_answer) {
                //     youAnsweredCorrectly();
                //   }
                //   youAnsweredWrong();
                // } }
              >
                {answers}

              </button>
            ))}
            {/* <button
              type="submit"
              data-testid="btn-next"
            // onClick={}
            >
              Next

            </button> */}
          </section>
        </main>
      </>
    );
  }
}

Game.propTypes = {
  tokenResponse: PropTypes.shape({
    token: PropTypes.string.isRequired,
    response_code: PropTypes.number.isRequired,
  }).isRequired,
  toAsk: PropTypes.shape.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  tokenResponse: state.login.returnToken,
  toAsk: state.game,
});

export default connect(mapStateToProps, null)(Game);
