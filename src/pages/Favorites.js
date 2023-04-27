import React from 'react';
import Header from '../components/Header';
import '../style/paginas/Album.css';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      favorites: [],

    };
  }

  componentDidMount() {
    this.cardMusicFavorit();
  }

  componentDidUpdate() {
    this.cardMusicFavorit();
  }

  cardMusicFavorit = async () => {
    const saveFavoriteCard = await getFavoriteSongs();
    this.setState({ favorites: saveFavoriteCard });
  };

  removeFavorito = async (music, event) => {
    if (event.target) {
      await removeSong(music);
    }
  }

  render() {
    const { favorites } = this.state;
    return (
      <div>
        <Header />
        <div className="mainFavorit">
          {favorites.map((music) => (

            <div key={ music.artistId } className="cardFavorit">
              <p className="textFavorit">
                {' '}
                {music.artistName}
                {' '}
                {music.trackName}
              </p>

              <img
                src={ music.artworkUrl100 }
                alt="imagem do cantor"
                className="imagemFavorit"
              />

              <audio data-testid="audio-component" src={ music.previewUrl } controls>
                <track kind="captions" />
                <code>audio</code>
              </audio>
              <button
                type="button"
                className="buttonFavorit"
                onClick={ (event) => this.removeFavorito(music, event) }
              >
                {' '}
                <svg className="empty" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                  <path fill="none" d="M0 0H24V24H0z" />
                  <path
                    d="M16.5 3C19.538 3 22 5.5 22 9c0 7-7.5 11-10 12.5C9.5
                  20 2 16 2 9c0-3.5 2.5-6 5.5-6C9.36 3 11 4 12 5c1-1 2.64-2 4.5-2zm-3.566
                   15.604c.881-.556 1.676-1.109 2.42-1.701C18.335
                   14.533 20 11.943 20 9c0-2.36-1.537-4-3.5-4-1.076
                   0-2.24.57-3.086 1.414L12 7.828l-1.414-1.414C9.74 5.57
                   8.576 5 7.5 5 5.56 5 4 6.656 4 9c0 2.944 1.666 5.533 4.645
                   7.903.745.592 1.54 1.145 2.421 1.7
                   .299.189.595.37.934.572.339-.202.635-.383.934-.571z"
                  />
                </svg>
                <svg className="filled" height="20" width="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 0H24V24H0z" fill="none" />
                  <path
                    d="M16.5 3C19.538 3
                  22 5.5 22 9c0 7-7.5 11-10 12.5C9.5 20 2 16 2
                   9c0-3.5 2.5-6 5.5-6C9.36 3 11 4 12 5c1-1 2.64-2 4.5-2z"
                  />
                </svg>
                Remover
                {' '}

              </button>
            </div>

          ))}
        </div>

      </div>
    );
  }
}

export default Favorites;
