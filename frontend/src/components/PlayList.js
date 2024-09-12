import React from 'react';
import PropTypes from 'prop-types';
import { Song } from './Song';
import '../fontDefinition/fonts.css';
import '../../public/assets/styles/PlayList.css';


export class PlayList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { PlayListName, PlayListImage, Ownerimage, OwnerName, songs, onClick } = this.props;
        return (
            <div onClick={onClick} className="container">
                <div className="image_preview_container">
                    <img src={`/assets/images/PLAYLISTS-IMAGES/${PlayListImage}`} alt="Playlist Image" className="playlist_image"/>
                </div>

                <div className="details">
                    <h2 className="playlist_title">{PlayListName}</h2>
                    <hr />
                    <div className="owner_info">
                        <img src={`/assets/images/USERS-PROFILE-PICTURES/${Ownerimage}`} alt="Owner Image" className="owner_image"/>
                            <div className="owner_details">
                                <h4 className="owner_name">{OwnerName}</h4>
                                <p className="song_count">Number of songs: {songs.length}</p>
                            </div>
                    </div>
                </div>
            </div>
        );
    }

    displayPlaylist(info){

    }
}

PlayList.propTypes = {
    PlayListName: PropTypes.string.isRequired,
    PlayListImage: PropTypes.string.isRequired,
    songs: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            artists: PropTypes.arrayOf(PropTypes.string).isRequired
        })
    ).isRequired,
    Ownerimage: PropTypes.string.isRequired,
    OwnerName: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};