import React from 'react';
import '../style/paginas/search.css';
import { Link } from 'react-router-dom';
import lupa from '../imagens/lupa.png';
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
    this.setState({
      albumNovo: albums,
      carregandoAp: false,
      inputArtista: '',
      salveArtista: inputArtista,
    });
  }

  ValidSearchButton = () => {
    const { inputArtista } = this.state;
    const changeLogin = inputArtista.length;
    const numeroMinimoCaracter = 2;
    if (changeLogin >= numeroMinimoCaracter) {
      this.setState({
        buttonHabilit: false,
      });
    } else {
      this.setState({
        buttonHabilit: true,
      });
    }
  }

  searchChange = ({ target }) => {
    this.setState({
      inputArtista: target.value,
    }, this.ValidSearchButton);
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

          <form className="formSearch">

            <label htmlFor="search-artist-input" className="relative block">

              <input
                data-testid="search-artist-input"
                className="inputSearch"
                onChange={ this.searchChange }
                value={ inputArtista }
                type="text"
                name="search"
              />

            </label>
            <button
              type="submit"
              data-testid="search-artist-button"
              className="searchButton"
              disabled={ buttonHabilit }
              onClick={ this.buttonPesquisar }
            >
              <img src={ lupa } alt="lupa" />
              Pesquisar
            </button>

          </form>
        )}
        <h3>
          Resultado de álbuns de:
          {' '}
          {salveArtista}
          {' '}
        </h3>

        <div className="cardAling">
          {albumNovo.length === 0 ? <h3> Nenhum álbum foi encontrado </h3>
            : albumNovo.map((album) => (

              <div key={ album.collectionId } className="card card-info">
                <Link
                  className="tituloCard"
                  to={ `album/${album.collectionId}` }
                  data-testid={ `link-to-album-${album.collectionId}` }
                >
                  <img
                    src={ album.artworkUrl100 }
                    alt={ album.artistName }
                    className="imagemCard"
                  />
                  <p>

                    {album.collectionName}
                    {' '}

                  </p>
                </Link>

              </div>
            ))}
        </div>
      </div>);
  }
}

export default Search;
