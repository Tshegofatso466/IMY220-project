import React from 'react';
import PropTypes from 'prop-types';
import { PlayList } from './PlayList';
import { Song } from './Song';
import { getPlaylistById } from '../api'; // Import the API function
import withNavigation from '../hoc'; // Import the HOC
import Fuse from 'fuse.js';
import '../fontDefinition/fonts.css';
import '../../public/assets/styles/Feed.css';

class Feed extends React.Component {
    filterPlaylists = () => {
        const { searchQuery, playLists } = this.props;
    
        if (!searchQuery) {
            return playLists;
        }
    
        const options = {
            keys: [
                'OwnerName',
                'PlayListName',
                'genre',
                'hashtags',
                'songs.title',
                'songs.artists'
            ],
            threshold: 0.4
        };
    
        const fuse = new Fuse(playLists, options);
    
        return fuse.search(searchQuery).map(result => result.item);
    };

    handlePlaylistClick = async (playlistId) => {
        // const { navigate } = this.props; // Destructure navigate from props
        console.log('Navigating to playlist ID:', playlistId);
        try {
            const playlist = await getPlaylistById(playlistId);
            console.log(playlist);
            sessionStorage.setItem('playlistId', playlistId);
            sessionStorage.setItem('profileId', playlist.profileId);
            this.props.navigate(`/playlistReview`); // Navigate to PlaylistReview with state
        } catch (error) {
            console.error("Failed to fetch playlist:", error);
        }
    };

    render() {
        const { songForm } = this.props; // Extract songForm prop
        const filteredPlaylists = this.filterPlaylists(); // Filtered playlists based on search query

        // If songForm is true, render individual songs from all playlists
        if (songForm) {
            return (
                <div className="playlist-feed">
                    {filteredPlaylists.map((playlist, playlistIndex) => (
                        <div key={playlistIndex}>
                            <h3>{playlist.PlayListName || 'Untitled Playlist'}</h3> {/* Playlist title above songs */}
                            {playlist.songs.map((song, songIndex) => (
                                <Song
                                    key={songIndex}
                                    title={song.title || 'Unknown Song'}
                                    artists={song.artists || ['Unknown Artist']}
                                    image={song.image}
                                    sportifyURL={song.sportifyURL}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            );
        }

        console.log(filteredPlaylists[0]);
        console.log(filteredPlaylists[1]);
        console.log(filteredPlaylists[2]);
        // Otherwise, render playlists
        return (
            <div className="playlist-feed">
                {filteredPlaylists.map((playlist, index) => (
                    <div
                        key={index}
                        // onClick={() => this.handlePlaylistClick(playlist.id)} // Ensure playlist has an id
                    >
                        <PlayList
                            PlayListName={playlist.PlayListName || 'Untitled Playlist'}
                            PlayListImage={playlist.PlayListImage || 'default_image.jpg'}
                            Ownerimage={playlist.OwnerImage || 'default_owner.jpg'}
                            OwnerName={playlist.OwnerName || 'Unknown Owner'}
                            songs={playlist.songs || []}
                            comments={playlist.comments || []}
                            profileId={playlist.profileId || ''} 
                            playlistId={playlist.id || ''}
                            onplaylistClick={() => this.handlePlaylistClick(playlist.id)}
                        />
                    </div>
                ))}
            </div>
        );
    }
}

Feed.propTypes = {
    playLists: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([
                PropTypes.string.isRequired,
                PropTypes.shape({ $oid: PropTypes.string.isRequired }) // To accommodate the MongoDB ID structure
            ]),
            PlayListName: PropTypes.string.isRequired,
            PlayListImage: PropTypes.string.isRequired,
            OwnerImage: PropTypes.string.isRequired,
            OwnerName: PropTypes.string.isRequired,
            songs: PropTypes.arrayOf(
                PropTypes.shape({
                    title: PropTypes.string.isRequired,
                    artists: PropTypes.arrayOf(PropTypes.string).isRequired
                })
            ).isRequired,
            comments: PropTypes.arrayOf(
                PropTypes.shape({
                    profileImage: PropTypes.string.isRequired,
                    userName: PropTypes.string.isRequired,
                    followers: PropTypes.number.isRequired,
                    commentText: PropTypes.string.isRequired,
                    timestamp: PropTypes.string.isRequired
                })
            )
        })
    ).isRequired,
    searchQuery: PropTypes.string.isRequired, // Prop for searchQuery
    songForm: PropTypes.bool.isRequired, // Prop to toggle between playlist and song form
};

export default withNavigation(Feed); // Wrap Feed component with the HOC