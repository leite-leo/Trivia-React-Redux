import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends React.Component {
  render() {
    const { assertions } = this.props;
    const tres = 3;
    return (
      <div>
        <Header />
        {
          assertions < tres ? (
            <h1 data-testid="feedback-text">Could be better...</h1>
          ) : (
            <h1 data-testid="feedback-text">Well Done!</h1>
          )
        }

      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  ...state.player,
});

export default connect(mapStateToProps)(Feedback);
