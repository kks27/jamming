const clientID = '2e659cba946e4d158a94ee5be9788db6';
const redirectURI = 'http://localhost:3000/';

let accessToken;
let expiresIn;

const Spotify = {

    getAccessToken() {
        const url = window.location.href;
        const token = url.match(/access_token=([^&]*)/);
        const time = url.match(/expires_in=([^&]*)/);
        if (accessToken) {
            return accessToken;
        } else if (token && time) {
            accessToken = token[1];
            expiresIn = time[1];
            window.setTimeout(() => accessToken = null, expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        } else {
            window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&redirect_uri=${redirectURI}&response_type=token`;
        }

    },

    search(searchTerm)
    {
        const accessToken = Spotify.getAccessToken();
        console.log(accessToken);
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

    savePlaylist(playListName, trackURIs)
    {
        let userID;
        let playListID;
        const accessToken= this.getAccessToken();
        const headers = { Authorization: `Bearer ${accessToken}`};

        if(playListName && trackURIs) {
            return fetch(`https://api.spotify.com/v1/me`,
                {
                    method: 'POST',
                    headers: headers
                })
                .then(response => response.json())
                .then(jsonResponse => {
                    userID = jsonResponse.id;
                    return;
                }).then(()=> {return(fetch(`https://api.spotify.com//v1/users/${userID}/playlists`,
                    {
                        headers:headers,
                        method:'POST',
                        body:JSON.stringify({name: playListName})
                    }).then(jsonResponse => { return playListID= jsonResponse.id })
                        .then(()=>{return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playListID}/tracks`,{
                            headers:headers,
                            method:'POST',
                            body: JSON.stringify({ uris: trackURIs })
                        }).then(response => {return response.json()})})

                )})

        };


    },

};

export default Spotify;