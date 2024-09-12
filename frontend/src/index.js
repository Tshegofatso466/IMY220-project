import React from "react";
import ReactDOM from "react-dom/client";
import { Header } from "./components/Header";
import { PlaylistPage } from './components/PlaylistPage';
import { PlaylistView } from './components/PlaylistView';
import { Profile } from './components/Profile';

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

const friends = [
    { id: 1, name: 'Alice Johnson' },
    { id: 2, name: 'Bob Smith' },
    { id: 3, name: 'Charlie Brown' },
    { id: 4, name: 'David Wilson' },
    { id: 5, name: 'Eve Davis' }
];

// const pictures = [
//     { id: 1, url: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Pic+1' },
//     { id: 2, url: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=Pic+2' },
//     { id: 3, url: 'https://via.placeholder.com/150/00FF00/FFFFFF?text=Pic+3' },
//     { id: 4, url: 'https://via.placeholder.com/150/FFFF00/FFFFFF?text=Pic+4' },
//     { id: 5, url: 'https://via.placeholder.com/150/FF00FF/FFFFFF?text=Pic+5' }
// ];


// const profile = {
//     profileImage: 'pfp8.jpg',
//     userName: 'kylie rec',
//     bio: 'just living my little life, got no beef with anyone',
//     followers: 300000,
//     following: 60,
//     playlists: dummyPlaylists,
//     friends: PropTypes.array.isRequired,
//     pictures: PropTypes.array.isRequired
// }

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
                <Profile
                    profileImage={profileData.profileImage}
                    userName={profileData.userName}
                    bio={profileData.bio}
                    followers={profileData.followers}
                    following={profileData.following}
                    playlists={profileData.playlists}
                    friends={profileData.friends}
                    pictures={profileData.pictures}
                    onPlaylistClick={this.handlePlaylistClick}
                />
            </div>
        );

        // return (
        //     <div>
        //         <Header searchQuery={this.state.searchQuery} onSearchChange={this.handleSearchChange} />
        //         <PlaylistPage
        //             playLists={dummyPlaylists}
        //             searchQuery={this.state.searchQuery}
        //             onPlaylistClick={this.handlePlaylistClick.bind(this)}  // Pass click handler to PlaylistPage
        //         />
        //     </div>
        // );

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