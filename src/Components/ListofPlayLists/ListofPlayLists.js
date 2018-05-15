import React, { Component } from 'react';
import Spotify from "../../util/Spotify";

class ListofPlayLists extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listOfPlayLists: [],
        }
        this.getListOfPlayLists = this.getListOfPlayLists.bind(this);
    }

    getListOfPlayLists() {
        console.log(`User has following playList`);
        const playlist = Spotify.getCurrentUsersPlayLists().then(results => {
            this.setState({listOfPlayLists: results});
            console.log(results);

        });
        console.log(playlist);
        // Spotify.getCurrentUsersPlayLists.then(results => {console.log(results)});
    }


    /**        Spotify.getCurrentUsersPlayLists.then(results =>{
            this.setState({listOfPlayLists: results});
        } );
    }**/
   componentWillMount()
   {
       this.getListOfPlayLists();
   }

    render(){

        let listOfPlayLists = this.props.listOfPlayLists ? this.props.listOfPlayLists : [];
        return(
            <div className="Playlists">
                <div className="Playlist-information">
                    <h1>Current PlayLists</h1>


                        {/*{this.state.listOfPlayLists.[0].name}*/}
                            {
                                listOfPlayLists.map(playlist => {
                                    <h3>{playlist.name}</h3>


                                }
                            )}

                </div>
            </div>
        );
    }
}

export default ListofPlayLists;