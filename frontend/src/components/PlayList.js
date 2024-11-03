import React from 'react';
import PropTypes from 'prop-types';
import { Song } from './Song';
import { savePlaylist } from '../api';
import '../fontDefinition/fonts.css';
import '../../public/assets/styles/PlayList.css';


export class PlayList extends React.Component {
    constructor(props) {
        super(props);
    }

    savePlaylist = async () => {
        const { profileId, playlistId } = this.props;
        const userId = sessionStorage.getItem('userId');
        if(userId === profileId){
            if (!confirm('this playlist already exists in your playlists archive, are you sure you want to save it')) {
                return;
            }
        }
        
        try {
            const response = await savePlaylist(userId, profileId, playlistId);
            if(response.error){
                console.error(response.error);
                return;
            }
            alert('Playlist saved successfully.');
        } catch (error) {
            console.error(error);
            alert('Failed to save playlist.');
        }
    }

    render() {
        const { PlayListName, PlayListImage, Ownerimage, OwnerName, songs, onClick, profileId } = this.props;
        const sameUser = sessionStorage.getItem('userId') === profileId;
        return (
            <div onClick={onClick} className="container">
                <div className="image_preview_container" onClick={this.props.onplaylistClick}>
                    <img src={`${PlayListImage}`} alt="Playlist Image" className="playlist_image" />
                </div>

                <div className="details">
                    <h2 className="playlist_title">{PlayListName}</h2>
                    <hr />
                    <div className="owner_info">
                        <img src={`${Ownerimage}`} alt="Owner Image" className="owner_image" />
                        <div className="owner_details">
                            <h4 className="owner_name">{OwnerName}</h4>
                            <p className="song_count">Number of songs: {songs.length}</p>
                        </div>
                    </div>
                    <div className='button_container'>
                        <button className='save_button' onClick={this.savePlaylist}>Save</button>
                    </div>
                </div>
            </div>
        );
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
    onClick: PropTypes.func,
    comments: PropTypes.arrayOf(
        PropTypes.shape({
            profileImage: PropTypes.string.isRequired,
            userName: PropTypes.string.isRequired,
            followers: PropTypes.number.isRequired,
            commentText: PropTypes.string.isRequired,
            timestamp: PropTypes.string.isRequired
        })
    ),
    profileId: PropTypes.string.isRequired,
    playlistId: PropTypes.string.isRequired,
    onplaylistClick: PropTypes.func.isRequired,
};