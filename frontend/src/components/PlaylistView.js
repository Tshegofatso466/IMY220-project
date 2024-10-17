import React from 'react';
// import PropTypes from 'prop-types';
import { ProfilePreview } from './ProfilePreview';
import { Song } from './Song';
import { CommentList } from './CommentList';
import { EditPlaylist } from './EditPlaylist';
import { CreatePlaylist } from './CreatePlaylist';
import { AddSong } from './AddSong';
import { CreateComment } from './CreateComment'; // Import the CreateComment component
import { getPlaylistById, createComment } from '../api'; // Import your API call
import '../../public/assets/styles/PlaylistView.css';

export class PlaylistView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playlist: null, // Store fetched playlist data
            showComments: false,
            showEditPlaylist: false,
            showCreatePlaylist: false,
            showAddSong: false,
            showCreateComment: false,
            comments: [],
            ownerImage: "",
            ownerName: "",
            followers: null,
        };
    }

    async componentDidMount() {
        //const { id } = this.props.match.params; // Get the playlist ID from URL params
        const id = sessionStorage.getItem('playlistId');
        console.log(id);
        try {
            const playlist = await getPlaylistById(id); // Fetch the playlist data
            this.setState({
                playlist: playlist.playlist,
                comments: playlist.playlist?.comments || [],
                followers: playlist.followers || 0,
                ownerImage: playlist.playlist.OwnerImage || 'default.png',
                ownerName: playlist.playlist.OwnerName || 'anonymous',
            });
        } catch (error) {
            console.error('Error fetching playlist:', error);
            // this.setState({ loading: false });
        }
    }

    handleLike = () => {
        console.log('Liked playlist');
    };

    handleComment = () => {
        this.setState((prevState) => ({
            showComments: !prevState.showComments,
        }));
    };

    handleAdd = () => {
        console.log('Added to collection');
    };

    handleCreatePlaylist = () => {
        this.setState((prevState) => ({
            showCreatePlaylist: !prevState.showCreatePlaylist,
        }));
    };

    handleEditPlaylist = () => {
        this.setState((prevState) => ({
            showEditPlaylist: !prevState.showEditPlaylist,
        }));
    };

    handleAddSong = () => {
        this.setState((prevState) => ({
            showAddSong: !prevState.showAddSong,
        }));
    };

    handleCreateComment = () => {
        this.setState((prevState) => ({
            showCreateComment: !prevState.showCreateComment,
        }));
    };

    handleAddComment = async (newComment) => {
        const returnedData = await createComment({
            playlistId: sessionStorage.getItem('playlistId'),
            profileId: sessionStorage.getItem('profileId'),
            userId: sessionStorage.getItem('userId'),
            comment: newComment
        });

        this.setState((prevState) => ({
            comments: [
                ...prevState.comments,
                {
                    profileImage: '/path/to/default/image.jpg',
                    userName: 'Anonymous',
                    followers: 0,
                    commentText: newComment,
                    timestamp: new Date().toISOString(),
                },
            ],
        }));
    };

    render() {
        const {
            playlist,
            showComments,
            showEditPlaylist,
            showCreatePlaylist,
            showAddSong,
            showCreateComment,
            comments,
            ownerImage,
            ownerName,
            followers
        } = this.state;

        if (!playlist) {
            return <div>Playlist not found</div>;
        }

        const { PlayListName, songs } = playlist;
        //const { ownerImage, ownerName, followers } = this.state;

        return (
            <div className="playlist-view-container">
                <img src={`/assets/images/RANDOM/latest2.jpg`} alt="Playlist background" className="playlist-background" />
                <div className="header-btn-container">
                    <button className="header-btn" onClick={this.handleCreatePlaylist}>
                        Create Playlist
                    </button>
                    <button className="header-btn" onClick={this.handleEditPlaylist}>
                        Edit Playlist
                    </button>
                    <button className="header-btn" onClick={this.handleAddSong}>
                        Add Song
                    </button>
                </div>

                <div className="playlist-header">
                    <h1 className="playlist-name">{PlayListName}</h1>
                    <div className="vertical-line"></div>
                    <div className="thePreview">
                        <ProfilePreview profileImage={ownerImage} userName={ownerName} followers={followers} />
                    </div>
                </div>

                <div className="playlist-body">
                    <div className="song-list">
                        {songs.map((song, index) => (
                            <Song key={index} title={song.title} artists={song.artists} />
                        ))}
                    </div>

                    <div className="icon-group">
                            <img className="icon-heart" onClick={this.handleLike} src="/assets/icons/heart.png" />
                            <img className="icon-comment" onClick={this.handleComment} src="/assets/icons/comment-alt.png" />
                            <img className="icon-add" onClick={this.handleCreateComment} src="/assets/icons/comment-medical.png" />
                    </div>
                </div>

                {showComments && <CommentList comments={comments} onClose={this.handleComment} />}
                {showEditPlaylist && <EditPlaylist playlistName={playlistName} songs={songs} onClose={this.handleEditPlaylist} />}
                {showCreatePlaylist && <CreatePlaylist onClose={this.handleCreatePlaylist} />}
                {showAddSong && <AddSong onClose={this.handleAddSong} />}
                {showCreateComment && (
                    <CreateComment onAddComment={this.handleAddComment} onClose={this.handleCreateComment} />
                )}
            </div>
        );
    }
}