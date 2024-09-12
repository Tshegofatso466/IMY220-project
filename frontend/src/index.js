import React from "react";
import ReactDOM from "react-dom/client";
import { Header } from "./components/Header";
import { PlaylistPage } from './components/PlaylistPage';
import { PlaylistView } from './components/PlaylistView';

// Dummy Data for Playlists
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
    },
    {
        PlayListName: "Top 50",
        PlayListImage: "drake.jpg",
        Ownerimage: "pfp3.jpg",
        OwnerName: "Jake Peralta",
        songs: [
            { title: "Song Five", artists: ["Artist G"] },
            { title: "Song Six", artists: ["Artist H"] },
        ],
    },
    {
        PlayListName: "Summer Tunes",
        PlayListImage: "kanye west.jpg",
        Ownerimage: "pfp4.jpg",
        OwnerName: "Amy Santiago",
        songs: [
            { title: "Song Seven", artists: ["Artist I", "Artist J"] },
            { title: "Song Eight", artists: ["Artist K"] },
        ],
    },
    {
        PlayListName: "Top 50",
        PlayListImage: "drake.jpg",
        Ownerimage: "pfp3.jpg",
        OwnerName: "Jake Peralta",
        songs: [
            { title: "Song Five", artists: ["Artist G"] },
            { title: "Song Six", artists: ["Artist H"] },
        ],
    },
    {
        PlayListName: "Summer Tunes",
        PlayListImage: "kanye west.jpg",
        Ownerimage: "pfp4.jpg",
        OwnerName: "Amy Santiago",
        songs: [
            { title: "Song Seven", artists: ["Artist I", "Artist J"] },
            { title: "Song Eight", artists: ["Artist K"] },
        ],
    },
    {
        PlayListName: "Top 50",
        PlayListImage: "drake.jpg",
        Ownerimage: "pfp3.jpg",
        OwnerName: "Jake Peralta",
        songs: [
            { title: "Song Five", artists: ["Artist G"] },
            { title: "Song Six", artists: ["Artist H"] },
        ],
    },
    {
        PlayListName: "Summer Tunes",
        PlayListImage: "kanye west.jpg",
        Ownerimage: "pfp4.jpg",
        OwnerName: "Amy Santiago",
        songs: [
            { title: "Song Seven", artists: ["Artist I", "Artist J"] },
            { title: "Song Eight", artists: ["Artist K"] },
        ],
    },
    // Add more dummy playlists if needed
];

const profileData = {
    profileImage: 'pfp8.jpg',
    userName: 'kylie rec',
    followers: 1200
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

    handlePlaylistClick(playlist) {
        this.setState({ currentPlaylist: playlist });
    };

    render() {
        const { currentPlaylist } = this.state;

        // If a playlist is clicked, show the PlaylistView; otherwise show the PlaylistPage
        if (currentPlaylist) {
            return (
                <div>
                    <Header searchQuery={this.state.searchQuery} onSearchChange={this.handleSearchChange} />
                    <PlaylistView
                        playlistName={currentPlaylist.PlayListName}
                        ownerImage={currentPlaylist.Ownerimage}
                        ownerName={currentPlaylist.OwnerName}
                        followers={1000}  // Example followers count
                        songs={currentPlaylist.songs}
                        playlistImage={currentPlaylist.PlayListImage}  // Background image
                    />
                </div>
            );
        }

        return (
            <div>
                <Header searchQuery={this.state.searchQuery} onSearchChange={this.handleSearchChange} />
                <PlaylistPage
                    playLists={dummyPlaylists}
                    searchQuery={this.state.searchQuery}
                    onPlaylistClick={this.handlePlaylistClick.bind(this)}  // Pass click handler to PlaylistPage
                />
            </div>
        );

        // return (
        //     <div>
        //         <ProfilePreview
        //             profileImage={profileData.profileImage}
        //             userName={profileData.userName}
        //             followers={profileData.followers}
        //         />
        //     </div>
        // );
        // return (
        //     <div>
        //         <Header searchQuery={this.state.searchQuery} onSearchChange={this.handleSearchChange} />
        //         <PlaylistPage playLists={dummyPlaylists} searchQuery={this.state.searchQuery} />
        //     </div>
        // );
    }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);