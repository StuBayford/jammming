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
				
		if (accessTokenMatch && expiresInMatch) {
			accessToken = accessTokenMatch[0];
			const expiresIn = Number(expiresInMatch[0]);

			window.setTimeout(() => accessToken = '', expiresIn * 1000); //Sets accessToken to expire at the value for expiresIn
			window.history.pushState('Access Token', null, '/'); //clears the parameters from the URL so the app doesn't try grabbing the access token after it has expired

			return accessToken;
		} else {
			window.location(`https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`);
		}
	}
}

export default Spotify;