import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import { fetchAPI } from '../redux/actions/gameStart';
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
      classes: 'btn btn-primary',
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

  youAnsweredCorrectly = () => {
    console.log('Correto chamado!');
    this.setState({
      classes: 'btn button-success',
    }, () => {
      console.log('Set State Chamado para sucesso!');
    });
  }

  youAnsweredWrong = () => {
    console.log('Errado chamado!');
    this.setState({
      classes: 'btn button-danger',
    }, () => {
      console.log('Set State Chamado para errado!');
    });
  }

  // classes padrão: 'btn btn-primary' sucesso: 'button-success' erro: 'button-danger'
  classDecider = (classes, answers, query, index) => {
    console.log('Classe atual no state:', classes);
    console.log('Qual a resposta clicada?', answers);
    console.log('Qual pergunta certa?', query.correct_answer);
    // console.log('Em que pé estamos no index?', index);
    // console.log('Qual pergunta errada?', query.incorrect_answers[index - 1]);
    if (classes === 'button-success'
    && answers === query.correct_answer) {
      console.log('Estou retornando Verdade');
      return 'button-success';
    }
    if (classes === 'button-danger'
    && answers === query.incorrect_answers[index - 1]) {
      console.log('Estou retornando Erro');
      return 'button-danger';
    }
    console.log('Estou retornando Primário');
    return 'btn btn-primary';
  }

  // O que está acontecendo?
  // a função classDecider está retornando apenas 'btn btn-primary' mesmo quando a entrada no parâmetro classes é 'button-success'.
  // Por algum motivo os parâmetros answer e query estão entrando como boleanos sendo que são strings.
  // isso não cauda nenhum problema já que if true === true ou if true === false também funciona.
  // query.correct_answer sempre tem o valor booleano true não sei pq...
  // answers muda de valor booleano toda hora
  // onClick e as funções youAnsweredCorrectly e youAnsweredWrong estão funcionando corretamente sempre.
  // já verifiquei o state e o redux. Tudo correto. O erro está na classDecider.

  // Alguem precisa olhar se as classes CSS estão certas no arquivo ou se há algum erro CSS.
  render() {
    const {
      redirect,
      questionsCount,
      seconds,
      disableButton,
      btnNext,
      plusplus,
      classes,
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
              .map((answers, index) => (
                <button
                  key={ index }
                  disabled={ disableButton }
                  type="button"
                  className={ this.classDecider(classes, answers, query, index) }
                  // className={ classes }
                  data-testid={
                    answers === query.correct_answer
                      ? 'correct-answer'
                      : `wrong-answer-${index}`
                  }
                  onClick={ () => {
                    if (answers === query.correct_answer) {
                      return this.youAnsweredCorrectly();
                    }
                    this.youAnsweredWrong();
                  } }
                >
                  { answers }

                </button>
              ))}

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
