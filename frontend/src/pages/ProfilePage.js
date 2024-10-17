import React from 'react';
import { PlayList } from '../components/PlayList';
import PropTypes from 'prop-types';
import { getUserById } from '../api';
import '../fontDefinition/fonts.css'; // Assuming fonts are already set up
import '../../public/assets/styles/Profile.css'; // Custom CSS for Profile component
import { EditProfile } from '../components/EditProfile'; // Importing the EditProfile component
// import { prototype } from 'file-loader';

export class Profile extends React.Component {
    constructor(props) {
        super(props);
        // State for the current tab (Playlists, Friends, Pictures) and toggling the edit profile form
        this.state = {
            activeTab: 'Playlists',
            openForm: false,
            playlists: [], 
            friends: [], 
            pictures: [], 
            onPlaylistClick: null
        };
    }

    // Function to set active tab
    setActiveTab = (tab) => {
        this.setState({ activeTab: tab });
    };

    // Function to toggle the edit profile form
    toggleEditProfileForm = () => {
        this.setState((prevState) => ({ openForm: !prevState.openForm }));
    };

    async componentDidMount() {
        const userId  = sessionStorage.getItem('userId') || 0; // Get userId from props
        console.log(userId);
        try {
            const user = await getUserById(userId); // Fetch user data using getUserById
            this.setState({ user: user, loading: false }); // Set user data in state
            console.log('User data fetched successfully:', user);
        } catch (error) {
            console.error("Error fetching user data:", error);
            this.setState({ loading: false }); // Handle loading state
        }
    }

    onPlaylistClick = (playlist) => {
        sessionStorage.setItem('playlistId', playlist.id);
        this.props.navigate('playlistReview/1');
    }

    // Function to render content based on the active tab
    renderContent() {
        const { playlists, friends, pictures, onPlaylistClick } = this.state;
        const { activeTab } = this.state;

        console.log("renderContent");

        switch (activeTab) {
            case 'Playlists':
                return (
                    <div className="playlist-container">
                        {playlists.map(playlist => (
                            <PlayList
                                key={playlist.id}
                                PlayListName={playlist.PlayListName}
                                PlayListImage={playlist.PlayListImage}
                                Ownerimage={playlist.Ownerimage}
                                OwnerName={playlist.OwnerName}
                                songs={playlist.songs}
                                onClick={() => onPlaylistClick(playlist)}
                            />
                        ))}
                    </div>
                );
            case 'Friends':
                return (
                    <div className="friends-list">
                        {friends.map(friend => <p key={friend.id}>{friend.name}</p>)}
                    </div>
                );
            case 'Pictures':
                return (
                    <div className="pictures-gallery">
                        {pictures.map(picture => (
                            <img key={picture.id} src={`/assets/images/USERS-PROFILE-PICTURES/${picture.url}`} alt="User Pic" />
                        ))}
                    </div>
                );
            default:
                return null;
        }
    }

    render() {
        const { profileImage, userName, bio, followers, following } = this.props;
        const { activeTab, openForm } = this.state;

        return (
            <div className="profile-page">
                {/* Background Image */}
                <img className="profile-bg" src="/assets/images/RANDOM/latest2.jpg" alt="Profile Background" />

                <div className="profile-content">
                    {/* Top-right Edit Profile button */}
                    <button className="edit-profile-btn" onClick={this.toggleEditProfileForm}>Edit Profile</button>

                    {/* Conditionally render the EditProfile form */}
                    {openForm && (
                        <EditProfile
                            userName={userName}
                            bio={bio}
                            onClose={this.toggleEditProfileForm}
                        />
                    )}

                    {/* User Profile and Details */}
                    <div className="profile-header">
                        {/* Left side: Profile Picture */}
                        <div className="profile-picture">
                            <img src={`/assets/images/USERS-PROFILE-PICTURES/${profileImage}`} alt="Profile" style={{ width: '160px', height: '160px', borderRadius: '50%' }} />
                        </div>

                        {/* Right side: User Details */}
                        <div className="profile-details">
                            <h2>{userName}</h2>
                            <p>{bio}</p>
                            <div className="followers-following">
                                <a href="#followers" className="link">
                                    <span>{followers}</span> Followers
                                </a>
                                <span className="divider">|</span>
                                <a href="#following" className="link">
                                    <span>{following}</span> Following
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Buttons: Follow and Add Friend */}
                    <div className="action-buttons">
                        <button className="btn follow-btn">Follow</button>
                        <button className="btn add-friend-btn">Add Friend</button>
                    </div>

                    {/* Horizontal Line */}
                    <hr />

                    {/* Tab Links: Playlists, Friends, Pictures */}
                    <div className="tab-links">
                        <span 
                            className={`tab-link ${activeTab === 'Playlists' ? 'active' : ''}`} 
                            onClick={() => this.setActiveTab('Playlists')}
                        >
                            Playlists
                        </span>
                        <span 
                            className={`tab-link ${activeTab === 'Friends' ? 'active' : ''}`} 
                            onClick={() => this.setActiveTab('Friends')}
                        >
                            Friends
                        </span>
                        <span 
                            className={`tab-link ${activeTab === 'Pictures' ? 'active' : ''}`} 
                            onClick={() => this.setActiveTab('Pictures')}
                        >
                            Pictures
                        </span>
                    </div>

                    {/* Render the content based on the active tab */}
                    <div className="tab-content">
                        {this.renderContent()}
                    </div>
                </div>
            </div>
        );
    }
}
Profile.protoTypes ={
    userId: PropTypes.string.isRequired,
}
// Prop validation
// Profile.propTypes = {
//     profileImage: PropTypes.string.isRequired,
//     userName: PropTypes.string.isRequired,
//     bio: PropTypes.string.isRequired,
//     followers: PropTypes.number.isRequired,
//     following: PropTypes.number.isRequired,
//     playlists: PropTypes.array.isRequired,
//     friends: PropTypes.array.isRequired,
//     pictures: PropTypes.array.isRequired,
//     // onPlaylistClick: PropTypes.func.isRequired
// };