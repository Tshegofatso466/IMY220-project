import React from 'react';
import PropTypes from 'prop-types';
import { ProfilePreview } from './ProfilePreview';
import { Song } from './Song'; // Assuming you already have a Song component
import { CommentList } from './CommentList'; // Import the CommentList component
import '../../public/assets/styles/PlaylistView.css';

export class PlaylistView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showComments: false,
            comments: [], // Initialize comments state
        };
    }

    handleLike = () => {
        // Future functionality for liking the playlist
        console.log('Liked playlist');
    };

    handleComment = () => {
        // Toggle the visibility of CommentList
        this.setState((prevState) => ({
            showComments: !prevState.showComments,
            comments: this.props.comments // Set comments from props or dummy data
        }));
    };

    handleAdd = () => {
        // Future functionality for adding the playlist to user’s collection
        console.log('Added to collection');
    };

    handleCreatePlaylist = () => {
        // Future functionality for creating a playlist
        console.log('Create Playlist');
    };

    handleEditPlaylist = () => {
        // Future functionality for editing a playlist
        console.log('Edit Playlist');
    };

    render() {
        const { playlistName, ownerImage, ownerName, followers, songs, playlistImage } = this.props;
        const { showComments, comments } = this.state;

        return (
            <div className="playlist-view-container">
                {/* Absolute Background Image */}
                <img src={`/assets/images/RANDOM/latest2.jpg`} alt="Playlist background" className="playlist-background" />
                <div className="header-btn-container">
                    <button className="header-btn" onClick={this.handleCreatePlaylist}>Create Playlist</button>
                    <button className="header-btn" onClick={this.handleEditPlaylist}>Edit Playlist</button>
                </div>

                {/* Playlist Header */}
                <div className="playlist-header">
                    <h1 className="playlist-name">{playlistName}</h1>
                    <div className="vertical-line"></div>
                    <div className='thePreview'>
                        <ProfilePreview profileImage={ownerImage} userName={ownerName} followers={followers} />
                    </div>
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

                {/* Conditionally render CommentList */}
                {showComments && (
                    <CommentList
                        comments={comments}
                        onClose={this.handleComment} // Reuse handleComment to toggle visibility
                    />
                )}
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
    comments: PropTypes.arrayOf(
        PropTypes.shape({
            profileImage: PropTypes.string.isRequired,
            userName: PropTypes.string.isRequired,
            followers: PropTypes.number.isRequired,
            commentText: PropTypes.string.isRequired,
            timestamp: PropTypes.string.isRequired
        })
    ) // Add comments prop for CommentList
};