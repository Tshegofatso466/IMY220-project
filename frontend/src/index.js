import React from "react";
import ReactDOM from "react-dom/client";
import { Playlists } from './pages/Playlists';
import { Home } from './pages/SplashPage';
import { ProfilePage } from './pages/ProfilePage'; // Import the Profile component
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { PlaylistReviewPage } from './pages/PlaylistReviewPage'; // Import the PlaylistView component
import { login, getPlaylists, getUserById, getPlaylistById } from './api';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            searchQuery: '',
            playlists: [],
            id: null,
            isLoggedIn: false,
        };
    }

    // Login function that sets user ID and fetches playlists
    Login = async (data) => {
        try {
            const response = await login(data);
            // console.log(response)
            this.setState({ id: response.id, isLoggedIn: true });
            const playlists = await getPlaylists();  // Fetch playlists after login
            // console.log("Fetched playlists:", playlists);
            this.setState({ playlists });
            sessionStorage.setItem('userId', this.state.id);
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    };

    fetchUserById = async (id) => {
        try {
            const user = await getUserById(id); // Fetch user details
            return user;
        } catch (error) {
            console.error("Error fetching user:", error);
            return null;
        }
    };

    fetchPlaylistById = async (id) => {
        try {
            const playlist = await getPlaylistById(id);
            return playlist;
        } catch (error) {
            console.error("Error fetching playlist:", error);
            return null;
        }
    };

    handleSearchChange = (query) => {
        this.setState({ searchQuery: query });
    };

    handlePlaylistClick = async (playlistId) => {
        try {
            const playlistData = await getPlaylistById(playlistId); // Fetch playlist details
            this.props.history.push('/playlist', { playlist: playlistData }); // Navigate to PlaylistView with playlist data
        } catch (error) {
            console.error('Error fetching playlist data:', error);
        }
    };

    render() {
        return (
            <Router>
                <Routes>
                    <Route path="/" element={<Home Login={this.Login} />} />
                    <Route path="/playlist" element={<Playlists
                        playLists={this.state.playlists}
                        searchQuery={this.state.searchQuery}
                        onChange={this.handleSearchChange}
                        onPlaylistClick={this.handlePlaylistClick}
                    />} />
                    <Route path="/playlistReview/:id" element={<PlaylistReviewPage
                        fetchPlaylistById={this.fetchPlaylistById}
                        searchQuery={this.state.searchQuery}
                        onChange={this.handleSearchChange} />} /> {/* Define the route for PlaylistView */}
                    <Route path="/profile" element={<ProfilePage
                        userName={this.state.id}
                        searchQuery={this.state.searchQuery}
                        onChange={this.handleSearchChange} />} />
                </Routes>
            </Router>
        );
    }
}
// profileImage: PropTypes.string.isRequired,
//     userName: PropTypes.string.isRequired,
//     bio: PropTypes.string.isRequired,
//     followers: PropTypes.number.isRequired,
//     following: PropTypes.number.isRequired,
//     playlists: PropTypes.array.isRequired,
//     friends: PropTypes.array.isRequired,
//     pictures: PropTypes.array.isRequired,
//     onPlaylistClick: PropTypes.func.isRequired

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);