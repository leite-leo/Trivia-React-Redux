import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPlayerInfo } from '../redux/action';
import '../styles/Login.css';

class Login extends React.Component {
  state = {
    email: '',
    name: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleClick = async () => {
    const { history, dispatch } = this.props;
    const tokenEndpoint = 'https://opentdb.com/api_token.php?command=request';
    const response = await fetch(tokenEndpoint);
    const data = await response.json();
    localStorage.setItem('token', data.token);

    dispatch(getPlayerInfo(this.state));
    history.push('/game');
  };

  render() {
    const { email, name } = this.state;
    const { history } = this.props;
    return (
      <div className="flex caixa">
        <h1>Login</h1>
        <div className="flex">
          <input
            type="text"
            placeholder="Nome"
            data-testid="input-player-name"
            name="name"
            onChange={ this.handleChange }
            className="flexInput"
          />
          <input
            type="email"
            placeholder="E-mail"
            data-testid="input-gravatar-email"
            name="email"
            onChange={ this.handleChange }
            className="flexInput"
          />
          <button
            type="button"
            data-testid="btn-play"
            disabled={ !email.length > 0 || !name.length > 0 }
            onClick={ this.handleClick }
            className="button"
          >
            Play
          </button>
          <button
            type="button"
            data-testid="btn-settings"
            onClick={ () => history.push('/config') }
            className="button"
          >
            Settings
          </button>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = (state) => ({ ...state.token });

export default connect(mapStateToProps)(Login);
