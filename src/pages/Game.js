// import PropTypes from 'prop-types'
import React, { Component } from 'react';
import Header from '../components/Header';
// import { connect } from 'react-redux';

export default class Game extends Component {
  // static propTypes = {
  //   second: third
  // }

  render() {
    return (
      <div>
        <Header />
        <main>
          <h1>game</h1>
        </main>
      </div>
    );
  }
}

// const mapStateToProps = (state) => ({})

// const mapDispatchToProps = {}

// export default connect(mapStateToProps, mapDispatchToProps)(Game)
