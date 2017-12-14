import React from 'react';
import './SearchResults.css';
import Tracklist from '../Tracklist/Tracklist';

class SearchResults extends React.Component {
	render() {
		<div className="SearchResults">
		  <h2>Results</h2>
		  <Tracklist tracks={this.props.searchResults} />
		</div>
	}
}

export default SearchResults;