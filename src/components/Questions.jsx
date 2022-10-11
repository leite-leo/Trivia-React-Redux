import React from 'react';
import { connect } from 'react-redux';

class Questions extends React.Component {
  state = {
    questions: [],
    isDisabled: false,
    count: 30,
    allAnswers: [],
  };

  async componentDidMount() {
    await this.fetchTrivia();
    this.disableButtons();
    this.countUpdate();
  }

  fetchTrivia = async () => {
    const token = localStorage.getItem('token');
    const ENDPOINT = `https://opentdb.com/api.php?amount=5&token=${token}`;
    const response = await fetch(ENDPOINT);
    const data = await response.json();

    if (data.results.length > 0) {
      this.setState({ questions: data.results }, this.setAnswerOptions);
    } else {
      window.location = '/';
    }
  };

  setAnswerOptions = async () => {
    const { questions } = this.state;
    console.log('questions', questions);
    let allAnswers = [];
    if (questions.length > 0) {
      allAnswers = [questions[0].correct_answer, ...questions[0].incorrect_answers];
    }
    console.log('array', allAnswers);
    this.setState({
      allAnswers,
    }, this.sortAnswers);
  };

  sortAnswers = () => {
    const { allAnswers } = this.state;
    const sortFactor = 0.5;
    allAnswers.sort(() => Math.random() - sortFactor);
    this.setState({
      allAnswers,
    });
    console.log('embaralhou?', allAnswers);
  };

  setIsDisable = () => {
    this.setState({
      isDisabled: true,
    });
  };

  disableButtons = () => {
    const timeOut = 30000;
    setTimeout(this.setIsDisable, timeOut);
  };

  countUpdate = () => {
    const oneSecond = 1000;
    this.timerId = setInterval(() => this.setState((previousState) => ({
      count: previousState.count - 1,
    }), () => {
      const { count } = this.state;
      if (count === 0) {
        clearInterval(this.timerId);
      }
    }), oneSecond);
  };

  render() {
    const { questions, isDisabled, count, allAnswers } = this.state;
    return (
      <div>
        <h1>{count}</h1>
        <h2>Questions</h2>
        {
          questions.length > 0
            && (
              <div>
                <h4 data-testid="question-category">{ questions[0].category }</h4>
                <p data-testid="question-text">{ questions[0].question }</p>
                <div data-testid="answer-options">
                  {
                    allAnswers?.map((element, index) => (
                      <button
                        key={ element }
                        disabled={ isDisabled }
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
