import React, { Component } from 'react';
//import logo from './logo.svg';
import SearchBar from '../SearchBar/SearchBar' ;
import SearchResults from  '../SearchResults/SearchResults';
import Playlist from  '../Playlist/Playlist';
import './App.css';
import Spotify from '../../utils/Spotify';



class App extends Component {
  constructor(props)
  {
    super(props);
    this.state= {
       searchResults: [],
       playlistName: '',
       playlistTracks:
           [{id:'1',name:'biggie',artist:'biggiesmalls',album:'reaady to die'},
               {id:'2',name:'nas',artist:'nases',album:'illmatic'},{name:'eminem',artist:'em',album:'marshall mathers'}],

  };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

    addTrack(track)
    {
        let tracks = this.state.playlistTracks;
        if(!tracks.find(savedTrack => savedTrack.id === track.id)){
            tracks.push(track);
            this.setState({ playlistTracks: tracks});
        }
    }

   removeTrack(track)
   {
       let newTracks = this.state.playlistTracks.map(track => track);
       if(this.state.playlistTracks.find(savedTrack =>
           savedTrack.id === track.id)){
           newTracks.pop(track);
           this.setState({ playlistTracks: newTracks }) ;
       }
   }

   updatePlaylistName(name)
   {
       this.setState({playlistName:name});
   }

   savePlaylist()
   {
       let trackURIs = this.state.playlistTracks.map(track => {
           return track.uri;
       });
   }

   search(term)
   {
       console.log(`User has searched for ${term}`);
       Spotify.search(term).then(results =>{
           if(results){
               this.setState({searchResults: results});
           }
       } );
   }

  render() {

    return (
      <div className="AppT">
        <h1>Ja<span class="highlight">mmm</span>ing</h1>
          <div className="App">
            <SearchBar onSearch={this.search} />
                <div className="App-playlist">
                    <SearchResults searchResults={this.state.searchResults} onAdd ={this.addTrack} />
                    <Playlist
                        playlistName={this.state.playlistName}
                        playlistTracks={this.state.playlistTracks}
                        onRemove = {this.removeTrack}
                        onNameChange={this.updatePlaylistName}
                        onSave={this.savePlaylist}
                    />
                </div>
            </div>
    </div>
    );
  }
}

export default App;


