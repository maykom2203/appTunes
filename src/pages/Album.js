import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      banda: [],
      album: '',
      artista: '',
    };
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.Musics(id);
  }

  Musics = async (id) => {
    const musicas = await getMusics(id);
    this.setState({ banda: musicas,
      album: musicas[0].collectionName,
      artista: musicas[0].artistName });
  }

  render() {
    const { banda, album, artista } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <div data-testid="album-name">
          {album}
        </div>
        <div data-testid="artist-name">
          {artista}
        </div>

        {banda.slice(1).map((artist, i) => (
          <>
            <div key={ i } />
            <p>{artist.trackName}</p>
            <audio data-testid="audio-component" src={ artist.previewUrl } controls>
              <track kind="captions" />
              <code>audio</code>
            </audio>

          </>
        ))}
      </div>

    );
  }
}

Album.propTypes = {
  match: PropTypes.objectOf(PropTypes.string),

};

Album.defaultProps = {
  match: 'string',
};
export default Album;
