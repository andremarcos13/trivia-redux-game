import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { login } = this.props;
    return (
      <header>
        <img
          src={ `${login.gravatar}` }
          alt="profile"
          data-testid="header-profile-picture"
        />
        <span data-testid="header-player-name">
          {login.profileName}
        </span>
        <span id="score" data-testid="header-score">0</span>
      </header>
    );
  }
}

Header.propTypes = {
  login: PropTypes.shape({
    gravatar: PropTypes.string.isRequired,
    profileName: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  login: state.login,
});

export default connect(mapStateToProps, null)(Header);
