import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { login } = this.props;
    return (
      <header>
        <div>
          <span data-testid="header-player-name">
            {login.profileName}
          </span>
          <img
            src={ login.gravatar }
            alt="profile"
            data-testid="header-profile-picture"
          />
          <span id="score" data-testid="header-score">0</span>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  login: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  login: state.login,
});

// const mapDispatchToProps = {};

export default connect(mapStateToProps, null)(Header);
