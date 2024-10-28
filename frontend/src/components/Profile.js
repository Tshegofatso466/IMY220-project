import React from 'react';
import { PlayList } from '../components/PlayList';
import PropTypes from 'prop-types';
import { getUserById, toggleFriend, getPlaylists } from '../api';
import withNavigation from '../hoc.js';
import '../fontDefinition/fonts.css'; // Assuming fonts are already set up
import '../../public/assets/styles/Profile.css'; // Custom CSS for Profile component
import { EditProfile } from '../components/EditProfile'; // Importing the EditProfile component
// import { prototype } from 'file-loader';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        // State for the current tab (Playlists, Friends, Pictures) and toggling the edit profile form
        this.state = {
            activeTab: 'Playlists',
            openForm: false,
            playlists: [],
            friends: [],
            pictures: [],
            onPlaylistClick: null,
            user: {},
            sameUser: false,
            friendsWithUser: false,
            userIsFriendWithProfile: false,
        };
        this.onPlaylistClick = this.onPlaylistClick.bind(this);
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
        const userId = sessionStorage.getItem('profileId') || 0; // Get userId from props
        console.log(userId);
        try {
            const user = await getUserById(userId); // Fetch user data using getUserById
            this.setState({ playlists: user.playlists, friends: user.friends, pictures: user.pictures, user: user }); // Set user data in state
            console.log('User data fetched successfully:', user);
            if (sessionStorage.getItem('userId') === sessionStorage.getItem('profileId')) {
                this.setState({ sameUser: true });
            }
            const profileIsFriendsWithUser = user.friends.some(friend => friend.id === (sessionStorage.getItem('userId')));
            this.setState({ friendsWithUser: profileIsFriendsWithUser });

            const mainUser = await getUserById(sessionStorage.getItem('userId'));
            const userIsFriendWithProfile = mainUser.friends.some(friend => friend.id === (sessionStorage.getItem('profileId')));
            this.setState({ userIsFriendWithProfile: userIsFriendWithProfile });

            if (!userIsFriendWithProfile) {
                this.setState({ activeTab: "--" });
            }

            this.updatePlaylists();
            console.log('this is the updated playlists', this.state.playlists);
        } catch (error) {
            console.error("Error fetching user data:", error);
            this.setState({ loading: false }); // Handle loading state
        }
    }

    onPlaylistClick = (playlist) => {
        sessionStorage.setItem('playlistId', playlist.id);
        this.props.navigate('/playlistReview');
    }

    handleAddFriend = async () => {
        //toggle the add or remove friend according to the 'userIsFriendWithProfile' flag.
        let response = null;
        if (this.state.sameUser) return;
        else if (this.state.userIsFriendWithProfile) {
            response = await toggleFriend(false, { userId: sessionStorage.getItem('userId'), profileId: sessionStorage.getItem('profileId') });
        }
        else {
            response = await toggleFriend(true, { userId: sessionStorage.getItem('userId'), profileId: sessionStorage.getItem('profileId') });
        }
        if (response.success) {
            this.setState(prevState => ({ userIsFriendWithProfile: !prevState.userIsFriendWithProfile }));
        }
    }

    updatePlaylists = async () => {
        const { playlists } = this.state;

        // const updatedPlaylists = await Promise.all(
        //     playlists.map(async (playlist) => {
        //         if (playlist.reference) {
        //             const data = await getPlaylists(playlist.id);
        //             return data || playlist;  // Return fetched data or original playlist if failed
        //         } else {
        //             return playlist;  // Return original playlist if no reference
        //         }
        //     })
        // );
        console.log('the id ... p ', sessionStorage.getItem('profileId'));
        const updatedPlaylists = await getPlaylists(sessionStorage.getItem('profileId'));

        // Update the state once all playlists are processed
        this.setState({ playlists: updatedPlaylists });
    };
    // Function to render content based on the active tab
    renderContent() {
        const { playlists, friends, pictures, onPlaylistClick, user } = this.state;
        const { activeTab } = this.state;

        console.log("renderContent");

        switch (activeTab) {
            case 'Playlists':
                return (
                    <div className="playlist-container">
                        {playlists.map((playlist, index)=> (
                            <PlayList
                                key={index}
                                PlayListName={playlist.PlayListName || 'unknown'}
                                PlayListImage={playlist.PlayListImage || '/assets/images/RANDOM/latest2.jpg'}
                                Ownerimage={ playlist.OwnerImage || user.profileImage || '/assets/images/RANDOM/latest2.jpg'}
                                OwnerName={playlist.OwnerName || user.username || 'Anonymous'}
                                songs={playlist.songs || []}
                                onplaylistClick={() => this.onPlaylistClick(playlist)}
                                playlistId={playlist.id || ''}
                                profileId={playlist.profileId || ''}
                            />
                        ))}
                    </div>
                //     <PlayList
                //     PlayListName={playlist.PlayListName || 'Untitled Playlist'}
                //     PlayListImage={playlist.PlayListImage || 'default_image.jpg'}
                //     Ownerimage={playlist.OwnerImage || 'default_owner.jpg'}
                //     OwnerName={playlist.OwnerName || 'Unknown Owner'}
                //     songs={playlist.songs || []}
                //     comments={playlist.comments || []}
                //     profileId={playlist.profileId || ''} 
                //     playlistId={playlist.id || ''}
                //     onplaylistClick={() => this.handlePlaylistClick(playlist.id)}
                // />
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
                            <img key={picture.id} src={`${picture.url}`} alt="User Pic" />
                        ))}
                    </div>
                );
            default:
                return null;
        }
    }

    render() {
        const { profileImage, username, bio, followers, following } = this.state.user;
        const { activeTab, openForm, sameUser, friendsWithUser, userIsFriendWithProfile } = this.state;

        return (
            <div className="profile-page">
                {/* Background Image */}
                <img className="profile-bg" src="/assets/images/RANDOM/latest2.jpg" alt="Profile Background" />

                <div className="profile-content">
                    {/* Top-right Edit Profile button */}
                    {sameUser &&
                        <button className="edit-profile-btn" onClick={this.toggleEditProfileForm}>Edit Profile</button>
                    }
                    {/* Conditionally render the EditProfile form */}
                    {openForm && (
                        <EditProfile
                            userName={username}
                            bio={bio}
                            onClose={this.toggleEditProfileForm}
                        />
                    )}

                    {/* User Profile and Details */}
                    <div className="profile-header">
                        {/* Left side: Profile Picture */}
                        <div className="profile-picture">
                            <img src={`${profileImage}`} alt="Profile" style={{ width: '160px', height: '160px', borderRadius: '50%' }} />
                        </div>

                        {/* Right side: User Details */}
                        <div className="profile-details">
                            <h2>{username} {friendsWithUser && !sameUser && <span className="kinda-hidden">(Friends with you)</span>}</h2>
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
                    {!sameUser &&
                        <div className="action-buttons">
                            <button className="btn follow-btn">Follow</button>
                            <button className="btn add-friend-btn" onClick={this.handleAddFriend}>{!userIsFriendWithProfile ? "Add Friend" : "Unfriend"}</button>
                        </div>
                    }

                    {/* Horizontal Line */}
                    <hr />

                    {/* Tab Links: Playlists, Friends, Pictures */}
                    <div className="tab-links">
                        {(userIsFriendWithProfile || sameUser) &&
                            <span
                                className={`tab-link ${activeTab === 'Playlists' ? 'active' : ''}`}
                                onClick={() => this.setActiveTab('Playlists')}
                            >
                                Playlists
                            </span>
                        }
                        {(userIsFriendWithProfile || sameUser) &&
                            <span
                                className={`tab-link ${activeTab === 'Friends' ? 'active' : ''}`}
                                onClick={() => this.setActiveTab('Friends')}
                            >
                                Friends
                            </span>
                        }
                        {(userIsFriendWithProfile || sameUser) &&
                            <span
                                className={`tab-link ${activeTab === 'Pictures' ? 'active' : ''}`}
                                onClick={() => this.setActiveTab('Pictures')}
                            >
                                Pictures
                            </span>
                        }
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
Profile.protoTypes = {
    userId: PropTypes.string.isRequired,
}

export default withNavigation(Profile);
