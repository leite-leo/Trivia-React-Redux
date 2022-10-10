// import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Questions from '../components/Questions';

class Game extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Questions />
      </div>
    );
  }
}

export default connect()(Game);
