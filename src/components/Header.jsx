import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { scoreBoard } = this.props;
    const gravatar = localStorage.getItem('ranking');
    const pegandoObj = JSON.parse(gravatar);
    return (
      <header>
        <img
          src={ `${pegandoObj.playerPhoto}` }
          alt="profile"
          data-testid="header-profile-picture"
        />
        <hr />
        <span>Player: </span>
        <span data-testid="header-player-name">
          {pegandoObj.name}
        </span>
        <hr />
        <span>Score: </span>
        <span id="score" data-testid="header-score">{`${scoreBoard}`}</span>
        <hr />
      </header>
    );
  }
}

Header.propTypes = {
  scoreBoard: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  scoreBoard: state.player.score,
});

export default connect(mapStateToProps, null)(Header);
