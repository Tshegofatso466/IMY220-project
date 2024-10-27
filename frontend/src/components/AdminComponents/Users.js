import React from 'react';
import PropTypes from 'prop-types';
import '../../../public/assets/styles/AdminStyles/Controllers.css';
import withNavigation from '../hoc.js';

class Users extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            loading: true,
            error: null,
        };
    }

    async componentDidMount() {
        try {
            // Fetch users from the API
            const response = await fetch('/api/users'); // Update with your actual API endpoint
            const data = await response.json();
            this.setState({ users: data, loading: false });
        } catch (error) {
            this.setState({ error: error.message, loading: false });
        }
    }

    handleDeleteUser = async (userId) => {
        // Function to delete a user
        if (window.confirm('Are you sure you want to delete this user?')) {
            await fetch(`/api/users/${userId}`, { method: 'DELETE' });
            this.setState((prevState) => ({
                users: prevState.users.filter(user => user._id !== userId),
            }));
        }
    };

    handleEditUser = (user) => {
        // Function to edit user details
        const updatedUser = { ...user }; // Implement your logic to get updated data
        // Call your API to update user
        // fetch(`/api/users/${user._id}`, { method: 'PUT', body: JSON.stringify(updatedUser) });
    };

    handleEditPlaylist = (userId, playlist) => {
        // Function to edit a playlist
        const updatedPlaylist = { ...playlist }; // Implement your logic to get updated playlist data
        // Call your API to update playlist
        // fetch(`/api/users/${userId}/playlists/${playlist.id}`, { method: 'PUT', body: JSON.stringify(updatedPlaylist) });
    };

    handleDeletePlaylist = async (userId, playlistId) => {
        // Function to delete a playlist
        if (window.confirm('Are you sure you want to delete this playlist?')) {
            await fetch(`/api/users/${userId}/playlists/${playlistId}`, { method: 'DELETE' });
            this.setState((prevState) => ({
                users: prevState.users.map(user => {
                    if (user._id === userId) {
                        return {
                            ...user,
                            playlists: user.playlists.filter(playlist => playlist.id !== playlistId),
                        };
                    }
                    return user;
                }),
            }));
        }
    };

    handleEditComment = (userId, playlistId, comment) => {
        // Function to edit a comment
        const updatedComment = { ...comment }; // Implement your logic to get updated comment data
        // Call your API to update comment
        // fetch(`/api/users/${userId}/playlists/${playlistId}/comments/${comment.commentId}`, { method: 'PUT', body: JSON.stringify(updatedComment) });
    };

    handleDeleteComment = async (userId, playlistId, commentId) => {
        // Function to delete a comment
        if (window.confirm('Are you sure you want to delete this comment?')) {
            await fetch(`/api/users/${userId}/playlists/${playlistId}/comments/${commentId}`, { method: 'DELETE' });
            this.setState((prevState) => ({
                users: prevState.users.map(user => {
                    if (user._id === userId) {
                        return {
                            ...user,
                            playlists: user.playlists.map(playlist => {
                                if (playlist.id === playlistId) {
                                    return {
                                        ...playlist,
                                        comments: playlist.comments.filter(comment => comment.commentId !== commentId),
                                    };
                                }
                                return playlist;
                            }),
                        };
                    }
                    return user;
                }),
            }));
        }
    };

    renderUsers() {
        const { users } = this.state;
        return users.map(user => (
            <div key={user._id} className="user-card">
                <img src={user.profileImage} alt={`${user.username}'s profile`} />
                <h3>{user.username}</h3>
                <p>{user.bio}</p>
                <button onClick={() => this.handleEditUser(user)}>Edit User</button>
                <button onClick={() => this.handleDeleteUser(user._id)}>Delete User</button>
                
                {user.playlists.map(playlist => (
                    <div key={playlist.id}>
                        <h4>{playlist.PlayListName}</h4>
                        <img src={playlist.PlayListImage} alt={`${playlist.PlayListName} cover`} />
                        <button onClick={() => this.handleEditPlaylist(user._id, playlist)}>Edit Playlist</button>
                        <button onClick={() => this.handleDeletePlaylist(user._id, playlist.id)}>Delete Playlist</button>
                        
                        {playlist.comments.map(comment => (
                            <div key={comment.commentId}>
                                <img src={comment.profileImage} alt={`${comment.userName}'s comment`} />
                                <p>{comment.commentText}</p>
                                <button onClick={() => this.handleEditComment(user._id, playlist.id, comment)}>Edit Comment</button>
                                <button onClick={() => this.handleDeleteComment(user._id, playlist.id, comment.commentId)}>Delete Comment</button>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        ));
    }

    render() {
        const { loading, error } = this.state;

        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error: {error}</p>;

        return (
            <div className="users-container">
                <h1>Admin Panel - User Management</h1>
                {this.renderUsers()}
            </div>
        );
    }
}

Users.propTypes = {
    // Define prop types here if necessary
};

export default withNavigation(Users);