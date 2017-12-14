import React from 'react';
import './Playlist.css';
import Tracklist from '../Tracklist/Tracklist';

class Playlist extends React.Component {
	render() {
		<div className="Playlist">
		  <input defaultValue={'New Playlist'} />
		  <Tracklist tracks={this.props.playlistTracks} />
		  <a className="Playlist-save">SAVE TO SPOTIFY</a>
		</div>
	}
}

export default Playlist;