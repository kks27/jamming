import React, { Component } from 'react';
import Spotify from "../../util/Spotify";

class ListofPlayLists extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listOfPlayLists: [{id:1,name:'kinnu'},{id:2,name:'nbuggy'},{}],
        },
        this.getListOfPlayLists = this.getListOfPlayLists.bind(this);
    }

    getListOfPlayLists() {
        console.log(`User has following playList`);
        Spotify.getCurrentUsersPlayLists().then(results => {
            this.setState({listOfPlayLists: results});
            console.log(results);

        });
    }

   componentWillMount()
   {
       this.getListOfPlayLists();
   }

    render(){

        return(
            <div className="Playlists">
                <div className="Playlist-information">
                    <h3>Current PlayLists</h3>
                    {this.state.listOfPlayLists.map((playlist) => <li key={playlist.id}> {playlist.name} </li>)}
                </div>
            </div>
        );
    }
}

export default ListofPlayLists;
