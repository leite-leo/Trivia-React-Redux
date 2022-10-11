import React from 'react';
import { connect } from 'react-redux';

class Questions extends React.Component {
  state = {
    questions: [],
    qIndex: 0,
    timeout: false,
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
    const { questions, qIndex } = this.state;
    let allAnswers;
    if (questions.length > 0) {
      allAnswers = [
        questions[qIndex].correct_answer,
        ...questions[qIndex].incorrect_answers,
      ];
    }
    return allAnswers;
  };

  handleNextQuestion = () => {
    const { qIndex, questions } = this.state;

    if (qIndex < questions.length - 1) {
      this.setState((prevstate) => (
        { qIndex: prevstate.qIndex + 1 }
      ));
    }
  };

  render() {
    const { questions, qIndex, timeout } = this.state;
    const sortFactor = 0.5;
    return (
      <div>
        <h2>Questions</h2>
        {
          questions.length > 0
            && (
              <div>
                <h4 data-testid="question-category">{ questions[qIndex].category }</h4>
                <p data-testid="question-text">{ questions[qIndex].question }</p>
                <div data-testid="answer-options">
                  {
                    this.setAnswerOptions()
                      .sort(() => Math.random() - sortFactor)
                      .map((element, index) => (
                        <button
                          key={ element }
                          type="button"
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
          !timeout
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

const mapStateToProps = (state) => ({
  ...state.questions,
});

export default connect(mapStateToProps)(Questions);
