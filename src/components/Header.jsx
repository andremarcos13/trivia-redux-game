import React, { Component } from 'react';

class Header extends Component {
  render() {
    const gravatar = localStorage.getItem('ranking');
    const pegandoObj = JSON.parse(gravatar);
    return (
      <header>
        <img
          src={ `${pegandoObj.picture}` }
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
        <span id="score" data-testid="header-score">0</span>
        <hr />
      </header>
    );
  }
}

export default Header;
