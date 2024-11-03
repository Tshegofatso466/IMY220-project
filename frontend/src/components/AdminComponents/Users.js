import React from 'react';
import PropTypes from 'prop-types';
import { getUsers, deleteProfile, deletePlaylist, deleteSong } from '../../api';
import { EditProfile } from'../EditProfile.js';
import { EditPlaylist } from '../EditPlaylist.js';
import '../../../public/assets/styles/AdminStyles/Users.css';
import '../../fontDefinition/fonts.css';
import withNavigation from '../../hoc.js';

class Users extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            loading: true,
            error: null,
            editPlaylist: false,
            editProfile: false,
            editSong: false,
            username: null,
            bio: null,
            playlist: null,
            superUser: null,
        };
    }

    async componentDidMount() {
        try {
            // Fetch users from the API
            const data = await getUsers(); // Update with your actual API endpoint
            this.setState({ users: data, loading: false });
        } catch (error) {
            this.setState({ error: error.message, loading: false });
        }
    }

    handleDeleteSong = async (userId, playlistId, songId) => {
        if (!userId) {
            console.log('No user id provided for deletion');
            return;
        }

        // try {
        //     if (!confirm('Are you sure you want to delete this user?')) {
        //         return;
        //     }
        //     const response = await deleteProfile(userId);
        //     if (response.error) {
        //         this.setState({ error: response.error, loading: false });
        //     }
        //     else {
        //         this.setState((prevState) => ({
        //             users: prevState.users.filter(user => user._id !== userId)
        //         }));
        //     }
        // }
        // catch (error) {
        //     console.log('Error deleting user', error);
        // }
    }

    handleEditSong = async (userId, playlistId, songId) => {
        console.log(`editing song .. `);
    }

    handleDeleteUser = async (userId) => {
        if (!userId) {
            console.log('No user id provided for deletion');
            return;
        }

        try {
            if (!confirm('Are you sure you want to delete this user?')) {
                return;
            }
            const response = await deleteProfile(userId);
            if (response.error) {
                this.setState({ error: response.error, loading: false });
            }
            else {
                this.setState((prevState) => ({
                    users: prevState.users.filter(user => user._id !== userId)
                }));
            }
        }
        catch (error) {
            console.log('Error deleting user', error);
        }
    };

    handleEditUser = (userId, username, bio) => {
        // console.log('edititing user', userId);

        const prev = sessionStorage.getItem('userId');
        sessionStorage.setItem('userId', userId);
        this.setState({bio: bio, username: username, superUser: prev});
        this.setState({ editProfile: true });
        
    };

    handleEditPlaylist = (userId, playlistId, playlist) => {
        // console.log('edititing playlist', playlistId);

        const prev = sessionStorage.getItem('userId');
        sessionStorage.setItem('userId', userId);
        sessionStorage.setItem('playlistId', playlistId);
        this.setState({ playlist: playlist});
        this.setState({ editPlaylist: true });
    };

    handleDeletePlaylist = async (userId, playlistId) => {
        if (!userId || !playlistId) {
            console.log('User ID or Playlist ID is missing.');
            return;
        }

        try {
            if (!window.confirm('Are you sure you want to delete this playlist?')) {
                return;
            }

            // Call the API to mark the playlist as deleted
            const response = await deletePlaylist(userId, playlistId);

            if (response.error) {
                this.setState({ error: response.error });
            } else {
                // Update the state to reflect the playlist as deleted
                this.setState((prevState) => ({
                    users: prevState.users.map(user => 
                        user._id === userId 
                        ? { 
                            ...user, 
                            playlists: user.playlists.filter(playlist => playlist._id !== playlistId) 
                        }
                        : user
                    )
                }));
            }
        } catch (error) {
            console.error('Error deleting playlist:', error);
        }
    };

    handleEditComment = (userId, playlistId, comment) => {
        console.log('edititing comment', playlistId, comment);
    };

    handleDeleteComment = async (userId, playlistId, commentId) => {
        console.log('deleting comment', playlistId, commentId);
    };

    //onClose functions

    toggleEditProfile = () => {
        sessionStorage.setItem('userId', this.state.superUser);
        this.setState({editProfile: !this.state.editProfile});
    }

    toggleEditPlaylist = () => {
        sessionStorage.setItem('userId', this.state.superUser);
        this.setState({editPlaylist:!this.state.editPlaylist});
    }

    toggleEditSong = () => {
        sessionStorage.setItem('userId', this.state.superUser);
        this.setState({editSong:!this.state.editSong});
    }

    render() {
        const { users, loading, error, editPlaylist, editProfile, editSong, username, bio, playlist } = this.state; // Ensure you're using 'users' from state
        if (loading) return <div>Loading...</div>;
        if (error) return <div>Error: {error}</div>;

        return (
            <>
                {/* the background image removed since it will be rendered in the parent component called 'main.js'*/}
                {/* <img className="Main" src='/assets/images/RANDOM/latest2.jpg' alt="Background Image" /> */}

                <div className="users-containerL">
                    {users && users.map((user, userIndex) => (
                        <div key={user._id} className='profile-containerL'>
                            <div className='profile-infoL'>
                                <span className="spans" >{userIndex + 1}. {user.username} - {user.email}</span>
                                <div>
                                    <button className="button" onClick={() => this.handleDeleteUser(user._id)}>Delete User</button>
                                    <button className="button" onClick={() => this.handleEditUser(user._id, user.username, user.bio)}>Edit User</button>
                                </div>
                                <img className="profile-imageL" src={user.profileImage} alt={user.username} />
                            </div>

                            <div className='playlistsL'>
                                <span className="spans" >Playlists:</span>
                                {user.playlists.map((playlist, playlistIndex) => (
                                    !playlist.reference && (<div key={playlist.id} className='playlist-containerL'>
                                        <span className="spans" >{playlistIndex + 1}. {playlist.PlayListName}</span>
                                        <div>
                                            <button className="button" onClick={() => this.handleDeletePlaylist(user._id, playlist.id)}>Delete Playlist</button>
                                            <button className="button" onClick={() => this.handleEditPlaylist(user._id, playlist.id, playlist)}>Edit Playlist</button>
                                        </div>

                                        <div className='songs'>
                                            <span className="spans" >Songs:</span>
                                            {playlist.songs.map((song, songIndex) => (
                                                <div key={song.songId} className='song-container'>
                                                    <span>{songIndex + 1}. {song.title} - (visit <a href={song.sportifyURL} target="_blank" rel="noopener noreferrer">Spotify</a>)</span>
                                                    <div>
                                                        <button className="button" onClick={() => this.handleDeleteSong(user._id, playlist.id, song.songId)}>Delete Song</button>
                                                        <button className="button" onClick={() => this.handleEditSong(user._id, playlist.id, song.songId)}>Edit Song</button>
                                                    </div>
                                                    <span className="spans" >Date: {song.dateAdded.slice(0, 10)}</span>
                                                    <span className="spans" >Artists:</span>
                                                    <ul>
                                                        {song.artists.map((artist, artistIndex) => (
                                                            <li key={artistIndex}>{artist}</li>
                                                        ))}
                                                    </ul>
                                                    <img className="song-imageL" src={song.image} alt={song.title} />
                                                </div>
                                            ))}
                                        </div>

                                        <div className='commentsL'>
                                            <span className="spans" >Comments:</span>
                                            {playlist.comments?.map((comment, commentIndex) => (
                                                <div key={comment.commentId} className='comment-container'>
                                                    <span className="spans" >{commentIndex + 1}. User - {comment.userName}</span>
                                                    <div>
                                                        <button className="button" onClick={() => this.handleDeleteComment(comment.commentId)}>Delete Comment</button>
                                                        <button className="button" onClick={() => this.handleEditComment(comment)}>Edit Comment</button>
                                                    </div>
                                                    <span className="spans" >Pinned: {comment.pinned.toString()}</span>
                                                    <span className="spans" >Date: {comment.timestamp.slice(0, 10)}</span>
                                                    <p className='commentText'>{comment.commentText}</p>
                                                    {comment.profileImage && <img className="comment-imageL" src={comment.profileImage} alt={comment.userName} />}
                                                </div>
                                            ))}
                                        </div>
                                        <img className="playlist-imageL" src={playlist.PlayListImage} alt={playlist.PlayListName} />
                                    </div>)
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                {editProfile && <EditProfile onClose={this.toggleEditProfile} userName={username} bio={bio}/>}
                {editPlaylist && <EditPlaylist onClose={this.toggleEditPlaylist} playlist={playlist}/>}
            </>
        );
    }
}

Users.propTypes = {
    // Define prop types here if necessary
};

export default withNavigation(Users);