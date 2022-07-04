import React from 'react';
import Header from '../components/Header';
import Carregando from '../components/Carregando';
import { getUser } from '../services/userAPI';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      loagin: true,
      nomeUser: '',
      buttonHabilit: true,
      inputArtista: '',
    };
  }

  componentDidMount() {
    this.rendComponent();
  }

  ValidSearchButton = () => {
    const { inputArtista } = this.state;
    const changeLogin = inputArtista.length;
    const numeroMinimoCaracter = 2;
    if (changeLogin >= numeroMinimoCaracter) {
      this.setState({
        buttonHabilit: false });
    } else {
      this.setState({
        buttonHabilit: true });
    }
  }

  searchChange = ({ target }) => {
    this.setState({
      inputArtista: target.value }, this.ValidSearchButton);
  }

rendComponent = async () => {
  const user = await getUser();
  this.setState({ loagin: false, nomeUser: user.name });
}

render() {
  const { loagin, nomeUser, buttonHabilit, inputArtista } = this.state;
  return (
    <div data-testid="page-search">
      <Header userNome={ nomeUser } />

      {loagin ? <Carregando /> : (
        <form>
          <label htmlFor="search-artist-input">
            <input
              type="text"
              data-testid="search-artist-input"
              onChange={ this.searchChange }
              value={ inputArtista }
            />
          </label>

          <button
            type="submit"
            data-testid="search-artist-button"
            disabled={ buttonHabilit }
          >
            Pesquisar

          </button>
        </form>
      )}
    </div>);
}
}

export default Search;
