import React from 'react';
import PropTypes from 'prop-types';
import { ProfilePreview } from './ProfilePreview';
import { Song } from './Song';
import { CommentList } from './CommentList';
import { EditPlaylist } from './EditPlaylist';
import { CreatePlaylist } from './CreatePlaylist';
import { AddSong } from './AddSong'; // Import the AddSong component
import '../../public/assets/styles/PlaylistView.css';

export class PlaylistView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showComments: false,
            showEditPlaylist: false,
            showCreatePlaylist: false,
            showAddSong: false, // New state to control AddSong modal visibility
            comments: [],
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
        this.setState((prevState) => ({
            showCreatePlaylist: !prevState.showCreatePlaylist
        }));
    };

    handleEditPlaylist = () => {
        this.setState((prevState) => ({
            showEditPlaylist: !prevState.showEditPlaylist
        }));
    };

    handleAddSong = () => {
        this.setState((prevState) => ({
            showAddSong: !prevState.showAddSong
        }));
    };

    render() {
        const { playlistName, ownerImage, ownerName, followers, songs, playlistImage } = this.props;
        const { showComments, showEditPlaylist, showCreatePlaylist, showAddSong, comments } = this.state;

        return (
            <div className="playlist-view-container">
                <img src={`/assets/images/RANDOM/latest2.jpg`} alt="Playlist background" className="playlist-background" />
                <div className="header-btn-container">
                    <button className="header-btn" onClick={this.handleCreatePlaylist}>Create Playlist</button>
                    <button className="header-btn" onClick={this.handleEditPlaylist}>Edit Playlist</button>
                    <button className="header-btn" onClick={this.handleAddSong}>Add Song</button> {/* Button to trigger AddSong */}
                </div>

                <div className="playlist-header">
                    <h1 className="playlist-name">{playlistName}</h1>
                    <div className="vertical-line"></div>
                    <div className='thePreview'>
                        <ProfilePreview profileImage={ownerImage} userName={ownerName} followers={followers} />
                    </div>
                </div>

                <div className="playlist-body">
                    <div className="song-list">
                        {songs.map((song, index) => (
                            <Song
                                key={index}
                                title={song.title}
                                artists={song.artists}
                            />
                        ))}
                    </div>

                    <div className="icon-group">
                        <i className="icon-heart" onClick={this.handleLike}>❤️</i>
                        <i className="icon-comment" onClick={this.handleComment}>💬</i>
                        <i className="icon-add" onClick={this.handleAdd}>➕</i>
                    </div>
                </div>

                {showComments && (
                    <CommentList
                        comments={comments}
                        onClose={this.handleComment}
                    />
                )}

                {showEditPlaylist && <EditPlaylist playlistName={playlistName} songs={songs} onClose={this.handleEditPlaylist} />}
                {showCreatePlaylist && <CreatePlaylist onClose={this.handleCreatePlaylist} />}
                {showAddSong && <AddSong onClose={this.handleAddSong} />} {/* Render AddSong component */}
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