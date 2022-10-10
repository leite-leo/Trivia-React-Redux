import React from 'react';
import { connect } from 'react-redux';
import { fetchTrivia } from '../redux/action';

class Questions extends React.Component {
  state = {
    answers: [],
  }

  async componentDidMount() {
    const { triviaAction } = this.props;
    await triviaAction();
    this.checkToken();
    
  }

  checkToken = () => {
    const { history, response_code: responseCode } = this.props;
    const invalidCode = 3;
    if (responseCode === invalidCode) {
      localStorage.removeItem('token');
      history.push('/');
    }
     this.allAnswers();
  };

  allAnswers = () => {
    const { results } = this.props;
    let answers = [];
    answers = [...results[0].incorrect_answers, results[0].correct_answer]
    console.log('respostas', answers);
    this.setState({ answers });
  };

  render() {
    const { results } = this.props;
    const { answers } = this.state;
    console.log(answers, 'answers do render')
    // console.log(results);
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
       )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ ...state.questions });

const mapDispatchToProps = (dispatch) => ({
  triviaAction: () => dispatch(fetchTrivia()),

});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
