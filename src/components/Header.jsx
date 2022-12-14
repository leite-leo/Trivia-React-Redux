import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import '../styles/Header.css';

class Header extends React.Component {
  // state = {
  //   score: 0,
  // };

  render() {
    // const { score } = this.state;
    const { name, gravatarEmail, score } = this.props;
    return (
      <header className="flexHead caixaHead">
        {/* <h2>Header</h2> */}
        <img
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${md5(gravatarEmail).toString()}` }
          alt="player"
          className="gravatar"
        />
        <h3 data-testid="header-player-name" className="name">{ name }</h3>
        <h3 data-testid="header-score" className="score">{ score }</h3>
      </header>
    );
  }
}

Header.propTypes = {
  gravatarEmail: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({ ...state.player });

export default connect(mapStateToProps)(Header);
