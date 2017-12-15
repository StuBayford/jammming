import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			searchResults: [
				{
					name: 'Clocks',
					artist: 'Coldplay',
					album: 'A Rush of Blood to the Head'
				},
				{
					name: 'Scientist',
					artist: 'Coldplay',
					album: 'A Rush of Blood to the Head'
				},
				{
					name: 'Strawberry Swing',
					artist: 'Coldplay',
					album: 'Viva la Vida'
				}
			],
			playlistName: 'My Songs',
			playlistTracks: [
				{
					name: 'Tiny Dancer',
					artist: 'Elton John',
					album: 'Madman Across the Water'
				},
				{
					name: 'Stronger',
					artist: 'Britney Spears',
					album: 'Oops I Did it Again'
				},
				{
					name: 'Brazil',
					artist: 'Deadmau5',
					album: 'Random Album Title'
				},
			]
		};

		this.addTrack = this.addTrack.bind(this);
		this.removeTrack = this.removeTrack.bind(this);
		this.updatePlaylistName = this.updatePlaylistName.bind(this);
<<<<<<< HEAD
		this.search = this.search.bind(this);
=======
		this.savePlaylist = this.savePlaylist.bind(this);
>>>>>>> save-playlist
	}

	addTrack(track) {
		let tracks = this.state.playlistTracks;

		if (this.state.playlistTracks.indexOf(track) === -1) {
			tracks.push(track);
			this.setState({playlistTracks: tracks});
		}
	}

	removeTrack(track) {
		let tracks = this.state.playlistTracks;
		let trackIndex = tracks.indexOf(track);

		if (trackIndex != -1) {
			tracks.splice(track, 1);
			this.setState({playlistTracks: tracks});
		}
	}

	updatePlaylistName(name) {
		this.setState({playlistName: name});
	}

<<<<<<< HEAD
	search(term) {
		console.log(term);
=======
	savePlaylist() {
		const trackUris = this.state.playlistTracks.map(track => track.uri);
>>>>>>> save-playlist
	}

	render() {
		return (
			<div>
			  <h1>Ja<span className="highlight">mmm</span>ing</h1>
			  <div className="App">
			    <SearchBar onSearch={this.search} />
			    <div className="App-playlist">
			      <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
			      <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist} />
			    </div>
			  </div>
			</div>
		);
	}
}