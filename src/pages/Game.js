import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import { fetchAPI } from '../redux/actions/gameStart';
import CorrectButton from '../components/ButtomCorrect';
import IncorrectButton from '../components/ButtonIncorrect';
import '../styles/gameStyles.css';

class Game extends Component {
  constructor() {
    super();

    this.state = {
      redirect: false,
      questionsCount: 0,
      seconds: 200, // acrescenta estado com o valor 30
      disableButton: false, // adiciona estado para controlar botoes de resposta
      // questionTimer: true,
      btnNext: false,
      plusplus: 0,
      randomizeAnswersState: [], // estado das respostas
      wasItAnswered: false,
    };
  }

  async componentDidMount() {
    const { dispatch } = this.props;
    // const { questionTimer } = this.state;
    const chave = localStorage.getItem('token');
    await dispatch(fetchAPI(chave));
    this.ramdomizerAnswers(); // chama funcao para randomizar
    // if (questionTimer === true) {
    //   this.timerDidMount();
    // }
  }

  componentDidUpdate() {
    this.redirectIfInvalidToken();
  }

  // timerDidMount = () => {
  //   const ONE_MILISEC = 1000; // 1 second = 1000 milliseconds.
  //   this.timer = setInterval(this.timerToAnswer, ONE_MILISEC); // The setInterval() method calls a function at specified intervals (in milliseconds).
  // }

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
    this.setState({
      randomizeAnswersState: ramdomAnswers, // salva resposta em um estado
    });
  }

  btnNextIplusplus = () => {
    const { plusplus } = this.state;
    const maxQuestions = 4;
    this.ramdomizerAnswers(); // chama funcao ao clicar no botao next

    if (plusplus === maxQuestions) {
      this.setState({ plusplus: 4, btnNext: false }); // se o estado do plusplus estiver no fim do array
      const { history } = this.props;
      history.push('/feedback'); // vai pra pagina de feedback
    } else {
      this.setState({
        plusplus: plusplus + 1,
        disableButton: false,
        // questionTimer: true,
        btnNext: false,
        seconds: 200,
      });
    }
    this.timerDidMount();
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

  // timerToAnswer = () => {
  //   const { seconds } = this.state;
  //   if (seconds > 0) {
  //     this.setState({
  //       seconds: seconds - 1,
  //     });
  //   } else {
  //     clearInterval(this.timer); // The setInterval() method continues calling the function until clearInterval() is called, or the window is closed.
  //     this.setState({ disableButton: true, questionTimer: false, btnNext: true });
  //   }
  // }

  youAnswered = () => {
    this.setState({
      wasItAnswered: true,
    });
  }

  render() {
    const {
      redirect,
      questionsCount,
      seconds,
      disableButton,
      btnNext,
      plusplus,
      wasItAnswered,
      randomizeAnswersState,
    } = this.state;
    const { toAsk } = this.props;
    const { questions } = toAsk;
    const { results } = questions;
    if (typeof results === 'undefined') {
      return 'Loading';
    } // NÃO REMOVA ESSA PORRA... NUNCA!
    const query = results[questionsCount];
    return (
      <>
        { redirect && <Redirect to="/" /> }
        <Header />
        <main>
          <section>
            <div>
              <span data-testid="question-category">{ results[plusplus].category }</span>
              <hr />
              <span data-testid="question-text">{ results[plusplus].question }</span>
              <hr />
            </div>
          </section>
          <section>
            {randomizeAnswersState
              .map((answers, index) => {
                if (answers === query.correct_answer) {
                  return (
                    <CorrectButton
                      key={ index }
                      disableButton={ disableButton }
                      wasItAnswered={ wasItAnswered }
                      answers={ answers }
                      youAnswered={ this.youAnswered() }
                    />);
                }
                return (
                  <IncorrectButton
                    key={ index }
                    disableButton={ disableButton }
                    wasItAnswered={ wasItAnswered }
                    answers={ answers }
                    youAnswered={ this.youAnswered() }
                  />);
              })}

            <h1>
              {`Tempo: ${seconds}`}
            </h1>
            {
              btnNext
              && (
                <button
                  type="submit"
                  data-testid="btn-next"
                  onClick={ this.btnNextIplusplus }
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
