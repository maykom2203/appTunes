import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Carregando from '../components/Carregando';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import { getUser } from '../services/userAPI';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      loagin: true,
      carregandoAp: false,
      nomeUser: '',
      buttonHabilit: true,
      inputArtista: '',
      salveArtista: '',
      albumNovo: [],
    };
  }

  componentDidMount() {
    this.rendComponent();
  }

  buttonPesquisar = async (event) => {
    event.preventDefault();
    const { inputArtista } = this.state;
    const albums = await searchAlbumsAPI(inputArtista);
    this.setState({ carregandoAp: true });
    this.setState({ albumNovo: albums,
      carregandoAp: false,
      inputArtista: '',
      salveArtista: inputArtista });
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
  const { loagin, nomeUser,
    buttonHabilit, inputArtista, albumNovo, carregandoAp, salveArtista } = this.state;
  return (
    <div data-testid="page-search">
      <Header userNome={ nomeUser } />

      {loagin === true || carregandoAp === true ? <Carregando /> : (
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
            onClick={ this.buttonPesquisar }

          >
            Pesquisar

          </button>
        </form>
      )}
      <p>
        Resultado de álbuns de:
        {' '}
        { salveArtista }
        {' '}
      </p>
      { albumNovo.length === 0 ? <p> Nenhum álbum foi encontrado </p>
        : albumNovo.map((album) => (
          <div key={ album.collectionId }>
            <p>
              <Link
                to={ `album/${album.collectionId}` }
                data-testid={ `link-to-album-${album.collectionId}` }
              >
                { album.collectionName}
                {' '}

              </Link>
            </p>
            <img src={ album.artworkUrl100 } alt={ album.artistName } />
          </div>
        ))}
    </div>);
}
}

export default Search;
