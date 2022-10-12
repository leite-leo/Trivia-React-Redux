import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { getPlayerScore } from '../redux/action';

class Questions extends React.Component {
  state = {
    questions: [],
    qIndex: 0,
    isDisabled: false,
    count: 30,
    allAnswers: [],
    anwsered: false,
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

  setAnswerOptions = () => {
    const { questions, qIndex } = this.state;
    const sortFactor = 0.5;
    let allAnswers;
    if (questions.length > 0) {
      allAnswers = [
        questions[qIndex].correct_answer,
        ...questions[qIndex].incorrect_answers,
      ];
    }
    const sortedAnswers = allAnswers.sort(() => Math.random() - sortFactor);
    this.setState({ allAnswers: sortedAnswers });
  };

  chooseAnswer = ({ target }) => {
    const { dispatch } = this.props;
    this.setState({ anwsered: true });
    clearInterval(this.timerId);
    // const selectedAnswer = target.attributes['data-testid'].value;
    const selectedAnswer = target.getAttribute('data-testid');
    console.log(selectedAnswer);

    if (selectedAnswer === 'correct-answer') {
      const { count, questions, qIndex } = this.state;
      const { difficulty } = questions[qIndex];
      console.log(count, difficulty);
      const hard = 3;
      const medium = 2;
      const easy = 1;
      const standardPoints = 10;
      let score;
      switch (difficulty) {
      case 'easy':
        score = standardPoints + (count * easy);
        break;
      case 'medium':
        score = standardPoints + (count * medium);
        break;
      case 'hard':
        score = standardPoints + (count * hard);
        break;
      default:
        score = 0;
      }
      console.log(score);
      dispatch(getPlayerScore(score));
    }
  };

  handleNextQuestion = () => {
    const { qIndex, questions } = this.state;

    if (qIndex < questions.length - 1) {
      this.setState((prevstate) => (
        { qIndex: prevstate.qIndex + 1 }
      ), () => this.setAnswerOptions());

      this.setState({
        count: 30,
        isDisabled: false,
        anwsered: false,
      }, this.countUpdate);
      this.disableButtons();
    }

    if (qIndex === questions.length - 1) {
      console.log('ultimo click');
      window.location = '/feedback';
    }
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
    const { questions, isDisabled, count, allAnswers, qIndex, anwsered } = this.state;
    return (
      <div>
        <h1>{count}</h1>
        <h2>Questions</h2>
        {
          questions.length > 0
            && (
              <div>
                <h4 data-testid="question-category">{ questions[qIndex].category }</h4>
                <p data-testid="question-text">{ questions[qIndex].question }</p>
                <div data-testid="answer-options">
                  {
                    allAnswers
                      .map((element, index) => (
                        <button
                          key={ element }
                          disabled={ isDisabled }
                          type="button"
                          onClick={ this.chooseAnswer }
                          data-testid={ element === questions[qIndex]
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
        {
          (count === 0 || anwsered)
          && (
            <button
              type="button"
              data-testid="btn-next"
              onClick={ this.handleNextQuestion }
            >
              Próxima Pergunta
            </button>
          )
        }
      </div>
    );
  }
}

Questions.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  ...state.player,
});

export default connect(mapStateToProps)(Questions);
