import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { fetchTrivia } from '../redux/action';

class Questions extends React.Component {
  state = {
    answers: [],
    isLoading: true,
  };

  async componentDidMount() {
    const { triviaAction, history } = this.props;
    await triviaAction(history);
    this.allAnswers();
  }

  allAnswers = () => {
    const { results } = this.props;
    let answers = [];
    if (results.length > 0) {
      answers = [...results[0].incorrect_answers, results[0].correct_answer];
      console.log('respostas', answers);
      const newAnswers = this.shuffleArray(answers);
      this.setState({
        answers: newAnswers,
        isLoading: false,
      });
    }
  };

  shuffleArray = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  render() {
    const { results } = this.props;
    const { answers, isLoading } = this.state;
    console.log(answers, 'answers do render');
    console.log(results, 'results do render');
    if (isLoading === false) {
      return (
        <div>
          {results && (
            <div>
              <h4
                data-testid="question-category"
              >
                Category:
                {' '}
                {results[0].category}
              </h4>
              <h4
                data-testid="question-text"
              >
                Question:
                {' '}
                {results[0].question}
              </h4>
              <div data-testid="answer-options">
                { answers.sort().map((options, i) => (
                  <button
                    key={ i }
                    type="button"
                    data-testid={ options === results[0].correct_answer ? 'correct-answer' : `wrong-answer-${i}` }
                  >
                    {options}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      );
    }
  }
}

Questions.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  response_code: PropTypes.func.isRequired,
  results: PropTypes.func.isRequired,
  triviaAction: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({ ...state.questions });

const mapDispatchToProps = (dispatch) => ({
  triviaAction: (history) => dispatch(fetchTrivia(history)),

});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
