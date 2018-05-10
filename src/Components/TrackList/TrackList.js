import React, { Component } from 'react';
import './TrackList.css';
import Track from '../Track/Track';

class TrackList extends Component {

    render(){
        let tracks = this.props.tracks ? this.props.tracks : [];

        return (
            <div className="TrackList">
                {
                    tracks.map(track => {
                        return <Track key={track.id}
                                      track={track}
                                      onAdd={this.props.onAdd}
                                      onRemove={this.props.onRemove}
                                        isRemoval={this.props.isRemoval} /> }
                    )}
                }

            </div>
        );
    }
}

export default TrackList;