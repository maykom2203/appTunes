import React from 'react';
import { Redirect } from 'react-router-dom';
import Carregando from '../components/Carregando';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      loagin: false,
      inputLogin: '',
      buttonHabilit: true,
      isLoading: false,
    };
  }

  buttonLogin = async (event) => {
    event.preventDefault();
    const { inputLogin } = this.state;
    this.setState({ loagin: true });
    await createUser({ name: inputLogin });
    this.setState({ loagin: false, isLoading: true });
  }

  ValidLogin = () => {
    const { inputLogin } = this.state;
    const changeLogin = inputLogin.length;
    const numeroMinimoCaracter = 3;
    if (changeLogin >= numeroMinimoCaracter) {
      this.setState({
        buttonHabilit: false });
    } else {
      this.setState({
        buttonHabilit: true });
    }
  }

  handleChange = ({ target }) => {
    this.setState({
      inputLogin: target.value }, this.ValidLogin);
  }

  render() {
    const { buttonHabilit, inputLogin, isLoading, loagin } = this.state;
    return (

      loagin ? <Carregando /> : (
        <div data-testid="page-login">
          <form>
            {isLoading && <Redirect to="/search" />}
            <label htmlFor="login-name-input">
              Login
              <input
                type="text"
                data-testid="login-name-input"
                onChange={ this.handleChange }
                value={ inputLogin }
              />
            </label>

            <button
              type="submit"
              data-testid="login-submit-button"
              disabled={ buttonHabilit }
              onClick={ this.buttonLogin }
            >
              Entrar

            </button>
          </form>
        </div>
      ));
  }
}

export default Login;
