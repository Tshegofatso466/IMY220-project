// import React from "react";
// import ReactDOM from "react-dom/client";
// import { Header } from "./components/Header";
// //import { PlaylistPage } from './components/PlaylistPage';
// //import { PlaylistView } from './components/PlaylistView';
// //import { Profile } from './components/Profile';
// //import { Home } from "./components/HomePage";
// import { Comment } from "./components/Comment";
// import { CommentList } from "./components/CommentList";

// import { PlaylistPage } from './pages/Home'
// import { PlaylistView } from './pages/PlaylistReviewPage'
// import { Profile } from './pages/ProfilePage'
// import { Home } from "./pages/SplashPage";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Correct import

// // Dummy Data for Playlists
// const dummyPlaylists = [
//     {
//         PlayListName: "Chill Vibes",
//         PlayListImage: "jcole.jpg",
//         Ownerimage: "pfp1.jpg",
//         OwnerName: "John Doe",
//         songs: [
//             { title: "Song One", artists: ["Artist A", "Artist B"] },
//             { title: "Song Two", artists: ["Artist C"] },
//         ],
//         comments: [  // Comments for this playlist
//             {
//                 profileImage: 'pfp1.jpg',
//                 userName: 'Alice',
//                 followers: 250,
//                 commentText: 'Love this playlist!',
//                 timestamp: new Date().toISOString(),
//             },
//             {
//                 profileImage: 'pfp2.jpg',
//                 userName: 'Bob',
//                 followers: 150,
//                 commentText: 'Chill vibes indeed!',
//                 timestamp: new Date().toISOString(),
//             }
//         ]
//     },
//     {
//         PlayListName: "Workout Hits",
//         PlayListImage: "ariana grande.jpg",
//         Ownerimage: "pfp2.jpg",
//         OwnerName: "Jane Smith",
//         songs: [
//             { title: "Song Three", artists: ["Artist D"] },
//             { title: "Song Four", artists: ["Artist E", "Artist F"] },
//         ],
//         comments: [  // Comments for this playlist
//             {
//                 profileImage: 'pfp3.jpg',
//                 userName: 'Charlie',
//                 followers: 300,
//                 commentText: 'Perfect for workouts!',
//                 timestamp: new Date().toISOString(),
//             }
//         ]
//     }
// ];

// const profileData = {
//     profileImage: 'pfp8.jpg',
//     userName: 'Kylie Rec',
//     bio: 'Just living my little life, got no beef with anyone',
//     followers: 1200,
//     following: 60,
//     playlists: dummyPlaylists,
//     friends: [
//         { id: 1, name: 'Alice Johnson' },
//         { id: 2, name: 'Bob Smith' },
//         { id: 3, name: 'Charlie Brown' },
//     ],
//     pictures: [
//         { id: 1, url: 'pfp7.jpg' },
//         { id: 2, url: 'pfp6.jpg' },
//     ]
// };

// const friends = [
//     { id: 1, name: 'Alice Johnson' },
//     { id: 2, name: 'Bob Smith' },
//     { id: 3, name: 'Charlie Brown' },
//     { id: 4, name: 'David Wilson' },
//     { id: 5, name: 'Eve Davis' }
// ];

// // const pictures = [
// //     { id: 1, url: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Pic+1' },
// //     { id: 2, url: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=Pic+2' },
// //     { id: 3, url: 'https://via.placeholder.com/150/00FF00/FFFFFF?text=Pic+3' },
// //     { id: 4, url: 'https://via.placeholder.com/150/FFFF00/FFFFFF?text=Pic+4' },
// //     { id: 5, url: 'https://via.placeholder.com/150/FF00FF/FFFFFF?text=Pic+5' }
// // ];


// // const profile = {
// //     profileImage: 'pfp8.jpg',
// //     userName: 'kylie rec',
// //     bio: 'just living my little life, got no beef with anyone',
// //     followers: 300000,
// //     following: 60,
// //     playlists: dummyPlaylists,
// //     friends: PropTypes.array.isRequired,
// //     pictures: PropTypes.array.isRequired
// // }

// class App extends React.Component {
//     constructor() {
//         super();
//         this.state = {
//             searchQuery: '',
//             currentPlaylist: null
//         };
//     }

//     handleSearchChange = (query) => {
//         this.setState({ searchQuery: query });
//     };

//     handlePlaylistClick(playlist) {
//         this.setState({ currentPlaylist: playlist });
//     };

//     // PlaylistPage.propTypes = {
//     //     playLists: PropTypes.array.isRequired,
//     //     searchQuery: PropTypes.string.isRequired,
//     //     onPlaylistClick: PropTypes.func.isRequired,
//     // };
//     render() {
//         return (
//             <Router>
//                 <Routes>
//                     <Route path="/" element={<Home />} />
//                     <Route path="/profile" element={<Profile
//                         profileImage={profileData.profileImage}
//                         userName={profileData.userName}
//                         bio={profileData.bio}
//                         followers={profileData.followers}
//                         following={profileData.following}
//                         playlists={profileData.playlists}
//                         friends={profileData.friends}
//                         pictures={profileData.pictures}
//                         onPlaylistClick={this.handlePlaylistClick}
//                     />} />
//                     <Route path="/playlist" element={<PlaylistPage
//                         playLists={dummyPlaylists}
//                         searchQuery={this.state.searchQuery}
//                         onPlaylistClick={this.handlePlaylistClick.bind(this)}  // Pass click handler to PlaylistPage
//                     />} />
//                     <Route path="/playlistReview" element={<PlaylistView
//                         playlistName={dummyPlaylists[0].PlayListName}
//                         ownerImage={dummyPlaylists[0].Ownerimage}
//                         ownerName={dummyPlaylists[0].OwnerName}
//                         followers={1000}  // Example followers count
//                         songs={dummyPlaylists[0].songs}
//                         playlistImage={dummyPlaylists[0].PlayListImage}  // Background image
//                         comments={dummyPlaylists[0].comments}
//                     />} />
//                 </Routes>
//             </Router>
//         );
//     }
//     // render() {
//     //     const { currentPlaylist } = this.state;

//     //     // If a playlist is clicked, show the PlaylistView; otherwise show the PlaylistPage
//     //     if (currentPlaylist) {
//     //         return (
//     //             <div>
//     //                 <Header searchQuery={this.state.searchQuery} onSearchChange={this.handleSearchChange} data={profileData} />
//     //                 <PlaylistView
//     //                     playlistName={currentPlaylist.PlayListName}
//     //                     ownerImage={currentPlaylist.Ownerimage}
//     //                     ownerName={currentPlaylist.OwnerName}
//     //                     followers={1000}  // Example followers count
//     //                     songs={currentPlaylist.songs}
//     //                     playlistImage={currentPlaylist.PlayListImage}  // Background image
//     //                     comments={currentPlaylist.comments}
//     //                 />
//     //             </div>
//     //         );
//     //     }

//     //     // return (
//     //     //     <div>
//     //     //         <Header searchQuery={this.state.searchQuery} onSearchChange={this.handleSearchChange} />
//     //     //         <Profile
//     //     //             profileImage={profileData.profileImage}
//     //     //             userName={profileData.userName}
//     //     //             bio={profileData.bio}
//     //     //             followers={profileData.followers}
//     //     //             following={profileData.following}
//     //     //             playlists={profileData.playlists}
//     //     //             friends={profileData.friends}
//     //     //             pictures={profileData.pictures}
//     //     //             onPlaylistClick={this.handlePlaylistClick}
//     //     //         />
//     //     //     </div>
//     //     // );

//     //     return (
//     //         <div>
//     //             <Header searchQuery={this.state.searchQuery} onSearchChange={this.handleSearchChange} />
//     //             <PlaylistPage
//     //                 playLists={dummyPlaylists}
//     //                 searchQuery={this.state.searchQuery}
//     //                 onPlaylistClick={this.handlePlaylistClick.bind(this)}  // Pass click handler to PlaylistPage
//     //             />
//     //         </div>
//     //     );

//     //     // return (
//     //     //     <div>
//     //     //         <ProfilePreview
//     //     //             profileImage={profileData.profileImage}
//     //     //             userName={profileData.userName}
//     //     //             followers={profileData.followers}
//     //     //         />
//     //     //     </div>
//     //     // );
//     //     // return (
//     //     //     <div>
//     //     //         <Header searchQuery={this.state.searchQuery} onSearchChange={this.handleSearchChange} />
//     //     //         <PlaylistPage playLists={dummyPlaylists} searchQuery={this.state.searchQuery} />
//     //     //     </div>
//     //     // );
//     // }
// }

// const data = [
//     {
//         profileImage: 'pfp1.jpg',
//         userName: 'Alice',
//         followers: 250,
//         commentText: 'Great post! Really enjoyed it.',
//         timestamp: new Date().toISOString(),
//     },
//     {
//         profileImage: 'pfp2.jpg',
//         userName: 'Bob',
//         followers: 150,
//         commentText: 'Thanks for the update!',
//         timestamp: new Date().toISOString(),
//     },
//     {
//         profileImage: 'pfp3.jpg',
//         userName: 'Charlie',
//         followers: 300,
//         commentText: 'This is fantastic, keep it up!',
//         timestamp: new Date().toISOString(),
//     },
//     {
//         profileImage: 'pfp4.jpg',
//         userName: 'Diana',
//         followers: 400,
//         commentText: 'Can you share more details?',
//         timestamp: new Date().toISOString(),
//     },
//     {
//         profileImage: 'pfp5.jpg',
//         userName: 'Eve',
//         followers: 500,
//         commentText: 'Amazing content, really helpful!',
//         timestamp: new Date().toISOString(),
//     },
//     {
//         profileImage: 'pfp6.jpg',
//         userName: 'Frank',
//         followers: 600,
//         commentText: 'Interesting read, thank you.',
//         timestamp: new Date().toISOString(),
//     },
//     {
//         profileImage: 'pfp7.jpg',
//         userName: 'Grace',
//         followers: 700,
//         commentText: 'Loved the insights shared here.',
//         timestamp: new Date().toISOString(),
//     },
//     {
//         profileImage: 'pfp8.jpg',
//         userName: 'Hank',
//         followers: 800,
//         commentText: 'Your playlist is actually good!',
//         timestamp: new Date().toISOString(),
//     }
// ];

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(<App />);