import PropTypes from 'prop-types';
import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchTrivia } from '../redux/action';

class Questions extends React.Component {
  state = {
    getAnswers: false,
    validToken: true,
    answerOptions: [],
  };

  async componentDidMount() {
    const { dispatch } = this.props;
    await dispatch(fetchTrivia());
    this.hasValidToken();
    this.setState({ getAnswers: true });
    this.setAnswerOptions();
  }

  hasValidToken = () => {
    const { response_code: ResponseCode } = this.props;
    const invalid = 3;
    if (ResponseCode === invalid) {
      this.setState({ validToken: false });
    }
  };

  setAnswerOptions = () => {
    const { results } = this.props;
    if (results.length > 0) {
      const answerArray = [results[0].correct_answer, ...results[0].incorrect_answers];
      this.setState({ answerOptions: answerArray });
    }
  };

  render() {
    const { validToken, getAnswers, answerOptions } = this.state;
    const { results } = this.props;
    return (
      <div>
        <h2>Questions</h2>
        { getAnswers && !validToken && <Redirect to="/" /> }
        {
          results.length > 0
            && (
              <div>
                <h4 data-testid="question-category">{ results[0].category }</h4>
                <p data-testid="question-text">{ results[0].question }</p>
                <div data-testid="answer-options">
                  {
                    answerOptions.sort().map((element, index) => (
                      <button
                        key={ element }
                        type="button"
                        data-testid={ element === results[0].correct_answer ? 'correct-answer' : `wrong-answer-${index}` }
                      >
                        {element}
                      </button>
                    ))
                  }
                </div>
              </div>
            )
        }
      </div>
    );
  }
}

Questions.propTypes = {
  dispatch: PropTypes.func.isRequired,
  response_code: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  ...state.questions,
});

export default connect(mapStateToProps)(Questions);
