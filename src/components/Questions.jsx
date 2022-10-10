import React from 'react';
import { connect } from 'react-redux';
import { fetchTrivia } from '../redux/action';

class Questions extends React.Component {
  componentDidMount() {
    const { triviaAction } = this.props;
    this.checkToken();
    triviaAction();
  }

  checkToken = () => {
    const { history, response_code } = this.props;
    const invalidCode = 3;
    if (response_code === invalidCode) {
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
  };

  render() {
    const { results } = this.props;
    // console.log(results);
    return (
      <div>
        {results?.map((element, index) => (<div key={ index }>
          <h4
            data-testid="question-category"
          >
            Category:
            {' '}
            {element.category}
          </h4>
          <h4
            data-testid="question-text"
          >
            Question:
            {' '}
            {element.question}
          </h4>
          {element.incorrect_answers?.map((options, i) => (<div key={ i }>
            <button
              type="button"
            >
              {options}
            </button>
          </div>
          ))}
       </div>))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ ...state.questions });

const mapDispatchToProps = (dispatch) => ({
  triviaAction: () => dispatch(fetchTrivia()),

});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
