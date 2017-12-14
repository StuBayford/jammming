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
	}

	render() {
		return (
			<div>
			  <h1>Ja<span className="highlight">mmm</span>ing</h1>
			  <div className="App">
			    <!-- Add a SearchBar component -->
			    <div className="App-playlist">
			      <SearchResults searchResults={this.state.searchResults} />
			      <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} />
			    </div>
			  </div>
			</div>
		);
	}
}