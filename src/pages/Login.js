import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginAction } from '../redux/actions/loginAction';

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

loginHandle = (event) => {
  event.preventDefault();
  const { history, login } = this.props;
  const { email } = this.state;
  login(email);
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

const mapDispatchToProps = (dispatch) => ({
  login: (email) => dispatch(loginAction(email)),
});

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
  login: PropTypes.func.isRequired,
};

Login.defaultProps = {
  history: null,
};

export default connect(null, mapDispatchToProps)(Login);
