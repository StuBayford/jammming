import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			searchResults: [],
			filteredSearchResults: [],
			playlistName: '',
			playlistTracks: []
		};

		this.addTrack = this.addTrack.bind(this);
		this.removeTrack = this.removeTrack.bind(this);
		this.updatePlaylistName = this.updatePlaylistName.bind(this);
		this.search = this.search.bind(this);
		this.savePlaylist = this.savePlaylist.bind(this);
		this.filterSearch = this.filterSearch.bind(this);
	}

	addTrack(track) {
		let tracks = this.state.playlistTracks;

		if (this.state.playlistTracks.indexOf(track) === -1) {
			let updatedPlaylistTracks = this.state.playlistTracks.concat(track);
			this.setState({
				playlistTracks: tracks
			});
		}

		this.filterSearch();
	}

	removeTrack(track) {
		let tracks = this.state.playlistTracks;
		let trackIndex = tracks.indexOf(track);

		if (trackIndex !== -1) {
			tracks.splice(track, 1);
			this.setState({playlistTracks: tracks});
		}

		this.filterSearch();
	}

	updatePlaylistName(name) {
		this.setState({playlistName: name});
	}


	search(term) {
		Spotify.search(term).then(results => {
			this.setState({searchResults: results})
		});

		this.filterSearch();
	}

	filterSearch() {
		let playlistTrackIds = this.state.playlistTracks.map(track => track.id);
		console.log(this.state.playlistTracks);
		console.log(playlistTrackIds);

		let filteredSearchResults = this.state.searchResults.map(track => {
			if (playlistTrackIds.includes(track.id)) {
				return;
			}

			return track;
		})

		console.log(this.state.searchResults);
		console.log(filteredSearchResults);

		this.setState({
			filteredSearchResults: filteredSearchResults
		});
	}

	savePlaylist() {
		const playlistName = this.state.playlistName;
		const trackUris = this.state.playlistTracks.map(track => track.uri);
		Spotify.savePlaylist(playlistName, trackUris).then( () => {
			this.setState({
				playlistName: 'New Playlist',
				playlistTracks: [],
				searchResults: []
			});
		});
	}

	render() {
		return (
			<div>
			  <h1>Ja<span className="highlight">mmm</span>ing</h1>
			  <div className="App">
			    <SearchBar onSearch={this.search} />
			    <div className="App-playlist">
			      <SearchResults searchResults={this.state.filteredSearchResults} onAdd={this.addTrack} />
			      <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist} />
			    </div>
			  </div>
			</div>
		);
	}
}

export default App;