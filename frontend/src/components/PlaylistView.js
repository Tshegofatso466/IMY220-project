import React from 'react';
import PropTypes from 'prop-types';
import { ProfilePreview } from './ProfilePreview';
import { Song } from './Song';  // Assuming you already have a Song component
import '../../public/assets/styles/PlaylistView.css';

export class PlaylistView extends React.Component {
    handleLike = () => {
        // Future functionality for liking the playlist
        console.log('Liked playlist');
    };

    handleComment = () => {
        // Future functionality for commenting on the playlist
        console.log('Commented on playlist');
    };

    handleAdd = () => {
        // Future functionality for adding the playlist to user’s collection
        console.log('Added to collection');
    };

    render() {
        const { playlistName, ownerImage, ownerName, followers, songs, playlistImage } = this.props;

        return (
            <div className="playlist-view-container">
                {/* Absolute Background Image */}
                <img src={`/assets/images/PLAYLISTS-BACKGROUND/${playlistImage}`} alt="Playlist background" className="playlist-background" />

                {/* Playlist Header */}
                <div className="playlist-header">
                    <h1 className="playlist-name">{playlistName}</h1>
                    <div className="vertical-line"></div>
                    <ProfilePreview profileImage={ownerImage} userName={ownerName} followers={followers} />
                </div>

                {/* Playlist Body */}
                <div className="playlist-body">
                    {/* Scrollable Song List */}
                    <div className="song-list">
                        {songs.map((song, index) => (
                            <Song
                                key={index}
                                title={song.title}
                                artists={song.artists}
                            />
                        ))}
                    </div>

                    {/* Vertical Icons */}
                    <div className="icon-group">
                        <i className="icon-heart" onClick={this.handleLike}>❤️</i>
                        <i className="icon-comment" onClick={this.handleComment}>💬</i>
                        <i className="icon-add" onClick={this.handleAdd}>➕</i>
                    </div>
                </div>
            </div>
        );
    }
}

PlaylistView.propTypes = {
    playlistName: PropTypes.string.isRequired,
    ownerImage: PropTypes.string.isRequired,
    ownerName: PropTypes.string.isRequired,
    followers: PropTypes.number.isRequired,
    songs: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            artists: PropTypes.arrayOf(PropTypes.string).isRequired
        })
    ).isRequired,
    playlistImage: PropTypes.string.isRequired,  // Playlist background image
};