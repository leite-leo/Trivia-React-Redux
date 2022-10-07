// import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
// import { requestTokenId } from '../redux/action';

class Game extends React.Component {
  // componentDidMount() {
  //   // this.getToken();
  // }

  // getToken = async () => {
  //   const { dispatch, tokenId } = this.props;
  //   await dispatch(requestTokenId());
  //   console.log(tokenId);
  //   // console.log(tokenId);
  //   localStorage.setItem('token', tokenId);
  // };

  render() {
    return (
      <div>
        <h1>Game</h1>
      </div>
    );
  }
}

// Game.propTypes = {
//   dispatch: PropTypes.func.isRequired,
//   tokenId: PropTypes.string.isRequired,
// };

const mapStateToProps = (state) => ({ ...state.token });

export default connect(mapStateToProps)(Game);
