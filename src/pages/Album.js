import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Carregando from '../components/Carregando';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      favorites: [],
      banda: [],
      album: '',
      artista: '',
      carregando: false,

    };
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.Musics(id);
    this.cardMusic();
  }

  componentDidUpdate() {
    this.cardMusic();
  }

  cardMusic = async () => {
    const saveFavorite = await getFavoriteSongs();
    this.setState({ favorites: saveFavorite });
  };

  Musics = async (id) => {
    const musicas = await getMusics(id);
    this.setState({
      banda: musicas,
      album: musicas[0].collectionName,
      artista: musicas[0].artistName,
    });
  }

  favoritChek = async (artist, event) => {
    this.setState({ carregando: true });
    await addSong(artist);
    this.setState({ carregando: false });
    if (event.target.checked) {
      removeSong(artist);
    }
  }

  render() {
    const { banda, album, artista, carregando, favorites } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <div data-testid="album-name">
          {album}
        </div>
        <div data-testid="artist-name">
          {artista}
        </div>
        {carregando ? <Carregando />

          : banda.slice(1).map((artist, i) => (
            <>
              <div key={ i } />
              <p>{artist.trackName}</p>
              <audio data-testid="audio-component" src={ artist.previewUrl } controls>
                <track kind="captions" />
                <code>audio</code>
              </audio>
              <form>
                <label htmlFor="checkbox-music">
                  Favorita
                  <input
                    type="checkbox"
                    data-testid={ `checkbox-music-${artist.trackId}` }
                    onChange={ (event) => this.favoritChek(artist, event) }
                    checked={ favorites.some((fav) => (
                      fav.trackId === artist.trackId)) }

                  />
                </label>
              </form>
            </>
          ))}

      </div>

    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),

};

Album.defaultProps = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};
export default Album;
