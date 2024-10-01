import React from "react";
import ReactDOM from "react-dom/client";
import { Playlists } from './pages/Playlists';
import { PlaylistView } from './pages/PlaylistReviewPage';
import { Profile } from './pages/ProfilePage';
import { Home } from './pages/SplashPage';
import { SignUpForm } from "./components/SignUpForm";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Correct import

const dummyPlaylists = [
    {
        PlayListName: "Chill Vibes",
        PlayListImage: "jcole.jpg",
        Ownerimage: "pfp1.jpg",
        OwnerName: "John Doe",
        songs: [
            { title: "Song One", artists: ["Artist A", "Artist B"] },
            { title: "Song Two", artists: ["Artist C"] },
        ],
        comments: [
            {
                profileImage: 'pfp1.jpg',
                userName: 'Alice',
                followers: 250,
                commentText: 'Love this playlist!',
                timestamp: new Date().toISOString(),
            },
            {
                profileImage: 'pfp2.jpg',
                userName: 'Bob',
                followers: 150,
                commentText: 'Chill vibes indeed!',
                timestamp: new Date().toISOString(),
            }
        ]
    },
    {
        PlayListName: "Workout Hits",
        PlayListImage: "ariana grande.jpg",
        Ownerimage: "pfp2.jpg",
        OwnerName: "Jane Smith",
        songs: [
            { title: "Song Three", artists: ["Artist D"] },
            { title: "Song Four", artists: ["Artist E", "Artist F"] },
        ],
        comments: [
            {
                profileImage: 'pfp3.jpg',
                userName: 'Charlie',
                followers: 300,
                commentText: 'Perfect for workouts!',
                timestamp: new Date().toISOString(),
            }
        ]
    }
];

const profileData = {
    profileImage: 'pfp8.jpg',
    userName: 'Kylie Rec',
    bio: 'Just living my little life, got no beef with anyone',
    followers: 1200,
    following: 60,
    playlists: dummyPlaylists,
    friends: [
        { id: 1, name: 'Alice Johnson' },
        { id: 2, name: 'Bob Smith' },
        { id: 3, name: 'Charlie Brown' },
    ],
    pictures: [
        { id: 1, url: 'pfp7.jpg' },
        { id: 2, url: 'pfp6.jpg' },
    ]
};

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            searchQuery: '',
            currentPlaylist: null
        };
    }

    handleSearchChange = (query) => {
        this.setState({ searchQuery: query });
    };

    handlePlaylistClick = (playlist) => {
        this.setState({ currentPlaylist: playlist });
    };

    toggleSignUpForm = () => {
        this.setState((prevState) => ({
            showSignUpForm: !prevState.showSignUpForm,
            showLoginForm: false
        }));
    };

    render() {
        return (
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/profile" element={<Profile
                        profileImage={profileData.profileImage}
                        userName={profileData.userName}
                        bio={profileData.bio}
                        followers={profileData.followers}
                        following={profileData.following}
                        playlists={profileData.playlists}
                        friends={profileData.friends}
                        pictures={profileData.pictures}
                        onPlaylistClick={this.handlePlaylistClick}
                    />} />
                    <Route path="/playlist" element={<Playlists
                        playLists={dummyPlaylists}
                        searchQuery={this.state.searchQuery}
                        onChange={this.handleSearchChange}
                        onPlaylistClick={this.handlePlaylistClick}  // Pass click handler to PlaylistPage
                    />} />
                    <Route path="/playlistReview" element={<PlaylistView
                        playlistName={dummyPlaylists[0].PlayListName}
                        ownerImage={dummyPlaylists[0].Ownerimage}
                        ownerName={dummyPlaylists[0].OwnerName}
                        followers={1000}
                        songs={dummyPlaylists[0].songs}
                        playlistImage={dummyPlaylists[0].PlayListImage}  // Background image
                        comments={dummyPlaylists[0].comments}
                    />} />
                    <Route path="/signUp" element={<SignUpForm onClose={this.toggleSignUpForm} />} />
                </Routes>
            </Router>
        );
    }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);