import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Questions from '../components/Questions';

class Game extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        <Header />
        {/* <Questions history={ history } /> */}
        <Questions history={ history } />
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default connect()(Game);
