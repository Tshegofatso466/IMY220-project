import React from 'react';
import { ProfilePreview } from './ProfilePreview';
import { Song } from './Song';
import { CommentList } from './CommentList';
import { EditPlaylist } from './EditPlaylist';
import { CreatePlaylist } from './CreatePlaylist';
import { AddSong } from './AddSong';
import { CreateComment } from './CreateComment'; // Import the CreateComment component
import { getPlaylistById, createComment, deletePlaylist } from '../api'; // Import your API call
import withNavigation from '../hoc.js';
import '../../public/assets/styles/PlaylistView.css';

class PlaylistView extends React.Component {
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
            ownerId: null,
            followers: null,
            playlistImage: ''
        };

        this.hadleNavigateToProfile = this.hadleNavigateToProfile.bind(this);
    }

    async componentDidMount() {
        //const { id } = this.props.match.params; // Get the playlist ID from URL params
        const id = sessionStorage.getItem('playlistId');
        // console.log(id);
        try {
            const playlist = await getPlaylistById(id); // Fetch the playlist data
            // console.log(playlist);
            this.setState({
                playlist: playlist.playlist || {},
                comments: playlist.playlist?.comments || [],
                followers: playlist.followers || 0,
                ownerImage: playlist.playlist.OwnerImage || 'default.png',
                ownerName: playlist.playlist.OwnerName || 'anonymous',
                ownerId: playlist.profileId,
                playlistImage: playlist.playlist.PlayListImage
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

    handleDelete = async () => {
        // console.log('About to delete a playlist');

        if (!confirm('Are you sure you want to delete this playlist?')) return;

        try {
            const response = await deletePlaylist(sessionStorage.getItem('userId'), sessionStorage.getItem('playlistId'));

            if (!response.error) {
                console.log('Playlist deleted successfully');
            } else {
                console.error('Error deleting playlist:', response.error);
            }
        } catch (error) {
            console.error('An error occurred during deletion:', error);
        }
    }

    handleAddComment = async (newComment, image) => {
        let returnedData = null;
        if (!image) {
            returnedData = await createComment({
                playlistId: sessionStorage.getItem('playlistId'),
                profileId: sessionStorage.getItem('profileId'),
                userId: sessionStorage.getItem('userId'),
                comment: newComment
            });
        }
        else {
            returnedData = await createComment({
                playlistId: sessionStorage.getItem('playlistId'),
                profileId: sessionStorage.getItem('profileId'),
                userId: sessionStorage.getItem('userId'),
                comment: newComment,
                image: image
            });
        }

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

    hadleNavigateToProfile = () => {
        sessionStorage.setItem('profileId', this.state.ownerId);
        // console.log('profileId: ', sessionStorage.getItem('profileId'));
        this.props.navigate('/profile');
    }
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
        // console.log('the songssss...', songs);
        // console.log('the date....', new Date().toISOString());
        //const { ownerImage, ownerName, followers } = this.state;
        const sameUser = sessionStorage.getItem('userId') === sessionStorage.getItem('profileId')

        return (
            <div className="playlist-view-container">
                <img src={`/assets/images/RANDOM/latest2.jpg`} alt="Playlist background" className="playlist-background" />
                <div className="header-btn-container">
                    <button className="header-btn" onClick={this.handleCreatePlaylist}>
                        Create Playlist
                    </button>
                    {sameUser && <button className="header-btn" onClick={this.handleEditPlaylist}>
                        Edit Playlist
                    </button>}
                    {sameUser && <button className="header-btn" onClick={this.handleAddSong}>
                        Add Song
                    </button>}
                    {sameUser && <button className="header-btn" onClick={this.handleDelete}>
                        Delete Playlist
                    </button>}
                </div>

                <div className="playlist-header">
                    <h1 className="playlist-name">{PlayListName}</h1>
                    <div className="vertical-line"></div>
                    <div className="thePreview" onClick={this.hadleNavigateToProfile}>
                        <ProfilePreview profileImage={ownerImage} userName={ownerName} followers={followers} />
                    </div>
                </div>

                <div className="playlist-body">
                    {songs.length !== 0 ? (<div className="song-list">
                        {songs.map((song, index) => (
                            <Song
                                key={index}
                                title={song.title}
                                artists={song.artists}
                                image={song.image}
                                spotifyURL={song.sportifyURL || '#here'}
                                dateAdded={song.dateAdded || "2024-09-30T12:34:56Z"}
                                deleted={song.deleted}
                                songId={song.songId} />
                        ))}
                    </div>) : (
                        <div className="no-songs-container">
                            <h5 className="no-songs">No songs in current playlist</h5>
                        </div>
                    )}

                    <div className="icon-group">
                        <img className="icon-heart" onClick={this.handleLike} src="/assets/icons/heart.png" />
                        <img className="icon-comment" onClick={this.handleComment} src="/assets/icons/comment-alt.png" />
                        <img className="icon-add" onClick={this.handleCreateComment} src="/assets/icons/comment-medical.png" />
                    </div>
                </div>

                {showComments && <CommentList comments={comments} onClose={this.handleComment} />}
                {showEditPlaylist && <EditPlaylist playlist={playlist} onClose={this.handleEditPlaylist} />}
                {showCreatePlaylist && <CreatePlaylist onClose={this.handleCreatePlaylist} />}
                {showAddSong && <AddSong songs={songs} onClose={this.handleAddSong} />}
                {showCreateComment && (
                    <CreateComment onAddComment={this.handleAddComment} onClose={this.handleCreateComment} />
                )}
            </div>
        );
    }
}

export default withNavigation(PlaylistView);