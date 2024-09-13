import React from 'react';
import PropTypes from 'prop-types';
import '../fontDefinition/fonts.css';
import '../../public/assets/styles/EditPlaylist.css';  // Create this file for custom styles.
import { Song } from './Song';  // Import the Song component

export class EditPlaylist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            songs: props.songs,  // Initialize with the current playlist songs
        };
    }

    // Method to delete a song from the playlist
    handleDeleteSong = (index) => {
        const updatedSongs = this.state.songs.filter((_, i) => i !== index);
        this.setState({ songs: updatedSongs });
    };

    render() {
        const { playlistName, onClose } = this.props;
        const { songs } = this.state;

        return (
            <div className="edit-playlist-overlay">
                <div className="edit-playlist-container">
                    <h2>Edit Playlist: {playlistName}</h2>
                    <button className="close-button" onClick={onClose}>✕</button>

                    <div className="songs-list">
                        {songs.length === 0 ? (
                            <p>No songs in this playlist.</p>
                        ) : (
                            songs.map((song, index) => (
                                <div key={index} className="song-edit-item">
                                    {/* Reuse the Song component */}
                                    <Song title={song.title} artists={song.artists} />
                                    <button
                                        className="delete-button"
                                        onClick={() => this.handleDeleteSong(index)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>
                <div className="dark-background"></div>
            </div>
        );
    }
}

EditPlaylist.propTypes = {
    playlistName: PropTypes.string.isRequired,  // Playlist title
    songs: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            artists: PropTypes.arrayOf(PropTypes.string).isRequired,
        })
    ).isRequired,
    onClose: PropTypes.func.isRequired,  // Function to close the modal
};