import React from "react";
import ReactDOM from "react-dom/client";
import { Playlists } from './pages/Playlists';
import { Home } from './pages/SplashPage';
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { PlaylistView } from './pages/PlaylistReviewPage'; // Import the PlaylistView component
import { login, getPlaylists, getPlaylistById } from './api';

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
            this.setState({ id: response.id, isLoggedIn: true });
            const playlists = await getPlaylists();  // Fetch playlists after login
            console.log("Fetched playlists:", playlists);
            this.setState({ playlists });
            return true;
        } catch (error) {
            console.error(error);
            return false;
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
                    <Route path="/playlistReview/:id" element={<PlaylistView />} /> {/* Define the route for PlaylistView */}
                </Routes>
            </Router>
        );
    }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);