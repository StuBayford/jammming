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
			      <!-- Add a SearchResults component -->
			      <!-- Add a Playlist component -->
			    </div>
			  </div>
			</div>
		);
	}
}