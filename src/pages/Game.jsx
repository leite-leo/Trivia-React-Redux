// import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Game extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <h1>Game</h1>
      </div>
    );
  }
}

export default connect()(Game);
