import PropTypes from 'prop-types';
import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchTrivia } from '../redux/action';

class Questions extends React.Component {
  state = {
    validToken: true,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchTrivia());
    this.hasValidToken();
  }
  // allAnswers = () => {
  //   const { results } = this.props;
  //   let answers = [];
  //   if (results.lenght > 0) {
  //     answers = [...results[0].incorrect_answers, results[0].correct_answer]
  //     console.log('respostas', answers);
  //     this.setState({ answers });
  //   }
  // };

  hasValidToken = () => {
    const { response_code: ResponseCode } = this.props;
    const invalid = 3;
    if (ResponseCode === invalid) {
      this.setState({ validToken: false });
    }
  };

  render() {
    const { validToken } = this.state;
    return (
      <div>
        {
          !validToken
            ? <Redirect to="/" />
            : (
              <h2>Questions</h2>
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
  // responseCode: state.questions.response_code,
  // results: [...state.questions.results],
});

export default connect(mapStateToProps)(Questions);
