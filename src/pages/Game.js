import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import { fetchAPI, saveStats } from '../redux/actions/gameStart';
import CorrectButton from '../components/ButtomCorrect';
import IncorrectButton from '../components/ButtonIncorrect';
import '../styles/gameStyles.css';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      redirect: false,
      questionsCount: 0,
      seconds: 30, // acrescenta estado com o valor 30
      disableButton: false, // adiciona estado para controlar botoes de resposta
      questionTimer: true,
      btnNext: false,
      randomizeAnswersState: [], // estado das respostas
      wasItAnswered: false,
      assertions: 0,
    };
  }

  async componentDidMount() {
    const { dispatch } = this.props;
    const { questionTimer } = this.state;
    const chave = localStorage.getItem('token');
    await dispatch(fetchAPI(chave));
    this.ramdomizerAnswers(0); // chama funcao para randomizar
    if (questionTimer === true) {
      this.timerDidMount();
    }
  }

  timerDidMount = () => {
    const ONE_MILISEC = 1000; // 1 second = 1000 milliseconds.
    this.timer = setInterval(this.timerToAnswer, ONE_MILISEC);// The setInterval() method calls a function at specified intervals (in milliseconds).
  }

  ramdomizerAnswers = (questionsCount) => {
    const { toAsk } = this.props;
    const { questions } = toAsk;
    const { results } = questions;
    const magicNumber = 3;
    if (questions.response_code === magicNumber) {
      localStorage.removeItem('token');
      console.log('pegando validacao 3');
      return;
    }
    const question = results[questionsCount]; // <<<< ERRO
    const ZERO_DOT_FIVE = 0.5;
    const toRandomizeAnswers = [...question.incorrect_answers, question.correct_answer];
    const ramdomAnswers = toRandomizeAnswers.sort(
      () => Math.random() - ZERO_DOT_FIVE,
    );
    this.setState({ randomizeAnswersState: ramdomAnswers });
  }

  handleButtonNext = () => {
    const { questionsCount } = this.state;
    const { history } = this.props;
    const maxQuestions = 4; // chama funcao ao clicar no botao next

    if (questionsCount === maxQuestions) {
      this.setState({ questionsCount: 4, btnNext: false }); // se o estado do plusplus estiver no fim do array
      // const sendToLocalStorage = localStorage.setItem('jcRanking', );
      history.push('/feedback'); // vai pra pagina de feedback
    } else {
      this.setState(() => ({
        questionsCount: questionsCount + 1,
        disableButton: false,
        questionTimer: true,
        btnNext: false,
        seconds: 30,
        wasItAnswered: false,
        assertions: 0,
      }));
      this.ramdomizerAnswers(questionsCount + 1);
      this.timerDidMount();
    }
  }

  redirectIfInvalidToken = () => {
    const { tokenResponse } = this.props;
    const responseCode = tokenResponse.response_code;
    if (responseCode !== 0) {
      localStorage.removeItem('token');
      this.setState({
        redirect: true });
    }
  }

  timerToAnswer = () => {
    const { seconds } = this.state;
    if (seconds > 0) {
      this.setState({
        seconds: seconds - 1,
      });
    } else {
      clearInterval(this.timer); // The setInterval() method continues calling the function until clearInterval() is called, or the window is closed.
      this.setState(
        { disableButton: true, questionTimer: false, btnNext: true, wasItAnswered: true },
      );
    }
  }

  youAnswered = ({ target }) => {
    const { toAsk, dispatch } = this.props;
    const { questions } = toAsk;
    const { results } = questions;
    const { questionsCount } = this.state;
    const query = results[questionsCount];
    this.setState((prev) => ({
      wasItAnswered: true, btnNext: true, assertions: prev.assertions + 1,
    }));
    clearInterval(this.timer); // stop the timer
    if (target.name === 'Correct') {
      const TEN = 10;
      const ONE = 1;
      const TWO = 2;
      const THREE = 3;
      const { assertions, seconds } = this.state;
      const newAssertions = assertions + ONE;
      this.setState({ assertions: newAssertions });
      const { difficulty } = query;
      if (difficulty === 'easy') {
        const score = TEN + (seconds * ONE);
        dispatch(saveStats(score, newAssertions));
      } else if (difficulty === 'medium') {
        const score = TEN + (seconds * TWO);
        dispatch(saveStats(score, newAssertions));
      } else {
        const score = TEN + (seconds * THREE);
        dispatch(saveStats(score, newAssertions));
      }
    }
  }

  render() {
    const {
      redirect,
      questionsCount,
      seconds,
      disableButton,
      btnNext,
      wasItAnswered,
      randomizeAnswersState,
    } = this.state;
    const { toAsk, history } = this.props;
    const { questions } = toAsk;
    const { results } = questions;
    if (typeof results === 'undefined') {
      return 'Loading';
    } // NÃO REMOVA ESSA PORRA... NUNCA!
    const magicNumber = 3;
    if (toAsk.questions.response_code === magicNumber) {
      history.push('/');
      return;
    }
    const query = results[questionsCount];
    return (
      <>
        { redirect && <Redirect to="/" /> }
        <Header />
        <main>
          <section>
            <div>
              <span data-testid="question-category">{ query.category }</span>
              <hr />
              <span data-testid="question-text">{ query.question }</span>
              <hr />
            </div>
          </section>
          <section>
            <div data-testid="answer-options">
              {randomizeAnswersState
                .map((answers, index) => {
                  if (answers === query.correct_answer) {
                    return (
                      <CorrectButton
                        key={ index }
                        index={ index }
                        disableButton={ disableButton }
                        wasItAnswered={ wasItAnswered }
                        answers={ answers }
                        youAnswered={ this.youAnswered }
                      />);
                  }
                  return (
                    <IncorrectButton
                      key={ index }
                      index={ index }
                      disableButton={ disableButton }
                      wasItAnswered={ wasItAnswered }
                      answers={ answers }
                      youAnswered={ this.youAnswered }
                    />);
                })}
            </div>
            <h1>
              {`Tempo: ${seconds}`}
            </h1>
            {
              btnNext
              && (
                <button
                  type="submit"
                  data-testid="btn-next"
                  onClick={ this.handleButtonNext }
                >
                  Next
                </button>
              )
            }
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
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
};

Game.defaultProps = {
  history: null,
};

const mapStateToProps = (state) => ({
  tokenResponse: state.tokenSaver,
  toAsk: state.game,
});

export default connect(mapStateToProps, null)(Game);
