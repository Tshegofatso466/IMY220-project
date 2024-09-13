import React from 'react';
import PropTypes from 'prop-types';
import { ProfilePreview } from './ProfilePreview';
import { Song } from './Song'; // Assuming you already have a Song component
import { CommentList } from './CommentList'; // Import the CommentList component
import { EditPlaylist } from './EditPlaylist'; // Import the EditPlaylist component
import { CreatePlaylist } from './CreatePlaylist'; // Import the CreatePlaylist component
import '../../public/assets/styles/PlaylistView.css';

export class PlaylistView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showComments: false,
            showEditPlaylist: false, // New state to control the EditPlaylist modal
            showCreatePlaylist: false, // New state to control the CreatePlaylist modal
            comments: [], // Initialize comments state
        };
    }

    handleLike = () => {
        console.log('Liked playlist');
    };

    handleComment = () => {
        this.setState((prevState) => ({
            showComments: !prevState.showComments,
            comments: this.props.comments
        }));
    };

    handleAdd = () => {
        console.log('Added to collection');
    };

    handleCreatePlaylist = () => {
        // Toggle the CreatePlaylist modal
        this.setState((prevState) => ({
            showCreatePlaylist: !prevState.showCreatePlaylist
        }));
    };

    handleEditPlaylist = () => {
        this.setState((prevState) => ({
            showEditPlaylist: !prevState.showEditPlaylist
        }));
    };

    render() {
        const { playlistName, ownerImage, ownerName, followers, songs, playlistImage } = this.props;
        const { showComments, showEditPlaylist, showCreatePlaylist, comments } = this.state;

        return (
            <div className="playlist-view-container">
                <img src={`/assets/images/RANDOM/latest2.jpg`} alt="Playlist background" className="playlist-background" />
                <div className="header-btn-container">
                    <button className="header-btn" onClick={this.handleCreatePlaylist}>Create Playlist</button>
                    <button className="header-btn" onClick={this.handleEditPlaylist}>Edit Playlist</button>
                </div>

                {/* Playlist Header */}
                <div className="playlist-header">
                    <h1 className="playlist-name">{playlistName}</h1>
                    <div className="vertical-line"></div>
                    <ProfilePreview profileImage={ownerImage} userName={ownerName} followers={followers} />
                </div>

                <div className="playlist-body">
                    <div className="song-list">
                        {songs.map((song, index) => (
                            <Song key={index} title={song.title} artists={song.artists} />
                        ))}
                    </div>

                    <div className="icon-group">
                        <i className="icon-heart" onClick={this.handleLike}>❤️</i>
                        <i className="icon-comment" onClick={this.handleComment}>💬</i>
                        <i className="icon-add" onClick={this.handleAdd}>➕</i>
                    </div>
                </div>

                {/* Conditionally render CommentList */}
                {showComments && <CommentList comments={comments} onClose={this.handleComment} />}

                {/* Conditionally render EditPlaylist modal */}
                {showEditPlaylist && (
                    <EditPlaylist
                        playlistName={playlistName}
                        songs={songs}
                        onClose={this.handleEditPlaylist}
                    />
                )}

                {/* Conditionally render CreatePlaylist modal */}
                {showCreatePlaylist && <CreatePlaylist onClose={this.handleCreatePlaylist} />}
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
    playlistImage: PropTypes.string.isRequired,
    comments: PropTypes.arrayOf(
        PropTypes.shape({
            profileImage: PropTypes.string.isRequired,
            userName: PropTypes.string.isRequired,
            followers: PropTypes.number.isRequired,
            commentText: PropTypes.string.isRequired,
            timestamp: PropTypes.string.isRequired
        })
    )
};