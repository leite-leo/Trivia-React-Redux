import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import { setResetScore } from '../redux/action';
import '../styles/Ranking.css';

class Ranking extends React.Component {
  state = {
    ranking: [],
  };

  componentDidMount() {
    this.setUpdateRanking();
  }

  setUpdateRanking = () => {
    const { name, score, gravatarEmail } = this.props;
    const token = localStorage.getItem('token');
    const actualRank = JSON.parse(localStorage.getItem('ranking'));
    const currentPlayer = [{ name, score, gravatarEmail, token }];

    if (actualRank === null) {
      localStorage.setItem('ranking', JSON.stringify(currentPlayer));
      this.setState({ ranking: currentPlayer });
    } else {
      const updateRanking = [...actualRank, ...currentPlayer];
      localStorage.setItem('ranking', JSON.stringify(updateRanking));
      this.setState({ ranking: updateRanking });
    }
  };

  resetScoreOnClick = () => {
    const { dispatch } = this.props;
    dispatch(setResetScore());
  };

  render() {
    const { ranking } = this.state;
    return (
      <div className="flex">
        <h1 data-testid="ranking-title" className="ranking">Ranking</h1>
        {
          ranking
            .sort((a, b) => b.score - a.score)
            .map((element, index) => (
              <div key={ element.token } className="flexRanking">

                <img
                  data-testid="ranking-title"
                  src={ `https://www.gravatar.com/avatar/${md5(element.gravatarEmail).toString()}` }
                  alt="perfil"
                  className="gravatarRanking"
                />
                <span
                  data-testid={ `player-name-${index}` }
                  className="nameRanking"
                >
                  { element.name }
                </span>
                <p
                  data-testid={ `player-score-${index}` }
                  className="scoreRanking"
                >
                  { element.score }
                </p>
              </div>
            ))
        }
        <div>
          <Link to="/">
            <button
              type="button"
              data-testid="btn-go-home"
              onClick={ this.resetScoreOnClick }
              className="buttonRanking"
            >
              Play Again
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

Ranking.propTypes = {
  gravatarEmail: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => state.player;

export default connect(mapStateToProps)(Ranking);
