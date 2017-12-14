import React from 'react';
import './Tracklist.css';
import Track from '../Track/Track';

class Tracklist extends React.Component {
	constructor(props) {
		super(props);

		this.addTrack = this.addTrack.bind(this);
	}

	addTrack() {
		this.props.onAdd(this.props.track);
	}

	render() {
		<div className="TrackList">
		    {this.props.tracks.map(track => {
		    	return <Track track={track} key={track.id} onAdd={this.props.onAdd} />
		    })}
		</div>
	}
}

export default Tracklist;