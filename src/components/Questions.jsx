import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

class Questions extends React.Component {
  state = {
    questions: [],
  };

  async componentDidMount() {
    this.fetchTrivia();
  }

  fetchTrivia = async () => {
    const token = localStorage.getItem('token');
    const ENDPOINT = `https://opentdb.com/api.php?amount=5&token=${token}`;
    const response = await fetch(ENDPOINT);
    const data = await response.json();

    if (data.results.length > 0) {
      this.setState({ questions: data.results });
    } else {
      window.location = '/';
    }
  };

  setAnswerOptions = () => {
    const { questions } = this.state;
    let allAnswers;
    if (questions.length > 0) {
      allAnswers = [questions[0].correct_answer, ...questions[0].incorrect_answers];
    }
    return allAnswers;
  };

  render() {
    const { questions } = this.state;
    const sortFactor = 0.5;
    return (
      <div>
        <h2>Questions</h2>
        {
          questions.length > 0
            && (
              <div>
                <h4 data-testid="question-category">{ questions[0].category }</h4>
                <p data-testid="question-text">{ questions[0].question }</p>
                <div data-testid="answer-options">
                  {
                    this.setAnswerOptions()
                      .sort(() => Math.random() - sortFactor)
                      .map((element, index) => (
                        <button
                          key={ element }
                          type="button"
                          data-testid={ element === questions[0]
                            .correct_answer ? 'correct-answer' : `wrong-answer-${index}` }
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

const mapStateToProps = (state) => ({
  ...state.questions,
});

export default connect(mapStateToProps)(Questions);
