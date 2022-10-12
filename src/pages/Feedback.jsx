import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import '../styles/Feedback.css';

class Feedback extends React.Component {
  render() {
    const { assertions, score } = this.props;
    const tres = 3;
    return (
      <div>
        <Header />
        {
          (assertions < tres && assertions) ? (
            <div className="feedbackReport">
              <h1>Correct answers:</h1>
              <h1 data-testid="feedback-total-question">{assertions}</h1>
              <h1>Your score:</h1>
              <h1 data-testid="feedback-total-score">{score}</h1>
              <h1 data-testid="feedback-text">Could be better...</h1>
            </div>
          ) : (
            <div className="feedbackReport">
              <h1>Correct answers:</h1>
              <h1 data-testid="feedback-total-question">{assertions}</h1>
              <h1>Your score:</h1>
              <h1 data-testid="feedback-total-score">{score}</h1>
              <h1 data-testid="feedback-text">Well Done!</h1>
            </div>
          )
        }

      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  ...state.player,
});

export default connect(mapStateToProps)(Feedback);
