import React from 'react';

class Login extends React.Component {
  state = {
    email: '',
    name: '',
    // isDisable: true,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  render() {
    const { email, name } = this.state;
    return (
      <div>
        <h1>Login</h1>
        <div>
          <input
            type="email"
            placeholder="E-mail"
            data-testid="input-gravatar-email"
            name="email"
            onChange={ this.handleChange }
          />
          <input
            type="text"
            placeholder="Nome"
            data-testid="input-player-name"
            name="name"
            onChange={ this.handleChange }
          />
          <button
            type="button"
            data-testid="btn-play"
            disabled={ !email.length > 0 || !name.length > 0 }
            // onClick={ this.setLogin }
          >
            Play
          </button>
        </div>
      </div>
    );
  }
}

export default Login;
