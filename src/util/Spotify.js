import React from 'react';

const clientId = 'df5b1d00f2804768aaa99617ae19d6c2';
const redirectUri = 'http://localhost:3000/';
let accessToken;

const Spotify = {
	getAccessToken() {
		if (accessToken) {
			return accessToken;
		}

		const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
		const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

		console.log(accessTokenMatch);
		console.log(expiresInMatch);
				
		if (accessTokenMatch && expiresInMatch) {
			accessToken = accessTokenMatch[1];
			const expiresIn = Number(expiresInMatch[1]);

			window.setTimeout(() => accessToken = '', expiresIn * 1000); //Sets accessToken to expire at the value for expiresIn
			window.history.pushState('Access Token', null, '/'); //clears the parameters from the URL so the app doesn't try grabbing the access token after it has expired

			return accessToken;
		} else {
			window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&show_dialog=true&redirect_uri=${redirectUri}`;
		}
	},

	search(term) {
		let accessToken = this.getAccessToken();
		
		return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
			headers: {
				Authorization: `Bearer ${accessToken}`
			}
		}).then(response => {
			if (response.ok) {
				return response.json();
			}

			throw new Error('Request failed!');
		}, networkError => {
			console.log(networkError.message);
		}).then(jsonResponse => {
			if(jsonResponse.tracks) {
				jsonResponse.tracks.items.map(track => ({
					id: track.id,
					name: track.name,
					artist: track.artists[0].name,
					album: track.album.name,
					uri: track.uri
				}));
			}
		});
	},

	savePlaylist(playlistName, trackUris) {
		if (!playlistName || !trackUris.length) {
			return;
		}

		const accessToken = this.getAccessToken();
		let headers = {
			Authorization: `Bearer ${accessToken}`
		};
		let userId;

		//Get user ID
		fetch('https://api.spotify.com/v1/me', {
			headers: headers
		}).then(response => {
			if (response.ok) {
				return response.json();
			}

			throw new Error('Request failed!');
		}, networkError => {
			console.log(networkError.message);
		}).then(jsonResponse => {
			userId = jsonResponse.id;

			headers = {
				Authorization: `Bearer ${accessToken}`,
				'Content-Type': 'application/json'
			};
			//Use user ID to create a new playlist
			return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
				headers: headers,
				method: 'POST',
				body: JSON.stringify({
					name: playlistName
				})
			}).then(response => {
				if (response.ok) {
					return response.json();
				}

				throw new Error('Request failed!');
			}, networkError => {
				console.log(networkError.message);
			}).then(jsonResponse => {
				let playlistId = jsonResponse.id;

				//Use new playlist ID to add tracks to
				fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
					headers: headers,
					method: 'POST',
					body: JSON.stringify({
						uris: trackUris
					})
				}).then(response => {
					if (response.ok) {
						return response.json();
					}

					throw new Error('Request failed!');
				}, networkError => {
					console.log(networkError.message);
				}).then(jsonResponse => jsonResponse);
			});
		});
	}
}

export default Spotify;