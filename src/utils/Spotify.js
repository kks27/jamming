let userAccessToken = '';
const clientId = '2e659cba946e4d158a94ee5be9788db6';
const redirectURI = 'http://localhost:3000/';

const Spotify = {

    getAccessToken()
    {
        if(userAccessToken) {
            return userAccessToken;
        } else if(
            window.location.href.match('/access_token=([^&]*)/') &&
            window.location.href.match('/expires_in=([^&]*)/'))
        {
            userAccessToken = window.location.href.match('/access_token=([^&]*)/')[1];
            const expiresIn = Number( window.location.href.match('/expires_in=([^&]*)/')[1]);
            window.setTimeout(() => userAccessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return userAccessToken;
        }else {
            window.location.href = encodeURI(`https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`);
        }

    },

    search(searchTerm)
    {
        const accessToken = Spotify.getAccessToken();
        const headers = { Authorization: `Bearer ${accessToken}`};

        return fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`,
            {   method:'GET',
                headers:headers})
            .then(response => response.json())
            .then(jsonResponse =>{
                if(jsonResponse.tracks.items){
                    let res = jsonResponse.tracks.items.map(track => ({
                        id: track.id,
                        name: track.name,
                        artist: track.artists[0].name,
                        album: track.album.name,
                        uri: track.uri
                        })
                    );
                    return res;
                }
        });
    },

};

export default Spotify;