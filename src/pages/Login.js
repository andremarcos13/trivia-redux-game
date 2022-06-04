import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { gravatarAct, tokenSaver } from '../redux/actions/loginAction';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      playerName: '',
      isButtonDisabled: true,
    };
  }

  inputHandle = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      const { email, playerName } = this.state;
      const re = /\S+@\S+\.\S+/;
      const result = re.test(email);
      const NUMBER_THREE = 3;
      if (result === true && playerName.length >= NUMBER_THREE) {
        this.setState({
          isButtonDisabled: false,
        });
      } else {
        this.setState({
          isButtonDisabled: true,
        });
      }
    });
  };

  gravatarFunc = async () => {
    const { dispatch } = this.props;
    const { email, playerName } = this.state;
    const hash = md5(email).toString();
    const url = `https://www.gravatar.com/avatar/${hash}`;
    const obj = { name: playerName, score: 0, playerPhoto: url };
    localStorage.setItem('ranking', JSON.stringify(obj));
    dispatch(gravatarAct(playerName, email));
  }

loginHandle = async (event) => {
  event.preventDefault();
  const { history, dispatch } = this.props;
  const response = await fetch('https://opentdb.com/api_token.php?command=request');
  const result = await response.json();
  localStorage.setItem('token', result.token);
  this.gravatarFunc();
  dispatch(tokenSaver(result));
  history.push('/game');
}

loginSettings = (event) => {
  event.preventDefault();
  const { history } = this.props;
  history.push('/settings');
}

render() {
  const { email, playerName, isButtonDisabled } = this.state;
  return (
    <div>
      <h1>Trivia</h1>
      <form>
        <label htmlFor="email">
          <input
            data-testid="input-gravatar-email"
            name="email"
            placeholder="ada@lovelance.com"
            type="email"
            value={ email }
            onChange={ this.inputHandle }
          />
        </label>
        <label htmlFor="name">
          <input
            data-testid="input-player-name"
            name="playerName"
            placeholder="Ada Lovelance"
            type="text"
            value={ playerName }
            onChange={ this.inputHandle }
          />
        </label>
        <button
          data-testid="btn-play"
          type="submit"
          disabled={ isButtonDisabled }
          onClick={ this.loginHandle }
        >
          Play

        </button>
        <button
          data-testid="btn-settings"
          type="submit"
          onClick={ this.loginSettings }
        >
          Settings

        </button>
      </form>
    </div>
  );
}
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
  dispatch: PropTypes.func.isRequired,
};

Login.defaultProps = {
  history: null,
};

export default connect()(Login);
