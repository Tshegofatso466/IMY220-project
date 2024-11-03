import React from 'react';
import PropTypes from 'prop-types';
import '../fontDefinition/fonts.css';
import { getGenres, editPlaylist } from '../api';
import '../../public/assets/styles/EditPlaylist.css';  // Create this file for custom styles.
// import { Song } from './Song';  // Import the Song component

export class EditPlaylist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playlistName: '',
            image: '',
            hashtags: [],
            genres: [],
            genreOptions: [],  // Preset genres
            hashtagInput: '',
            selectedGenre: '',
            errorMessage: '' 
        };
    }

    async componentDidMount(){
        const adminGenres = await getGenres();
        const { PlayListName, hashtags, genres, PlayListImage} = this.props.playlist;
        this.setState({playlistName: PlayListName, hashtags: hashtags, genres: genres, genreOptions: adminGenres, image: PlayListImage});
        // console.log('EditPlaylist Mounted');
    }

    // Method to delete a song from the playlist
    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    handleFileUpload = async (event) => {
        const file = event.target.files[0];
        const base64 = await this.convertToBase64(file);
        this.setState({ image: base64 });
    };

    handleAddHashtag = (event) => {
        event.preventDefault();
        const { hashtagInput, hashtags } = this.state;
        if (hashtagInput.trim() === '') {
            this.setState({ errorMessage: 'Hashtag cannot be empty' });
            return;
        }
        this.setState({
            hashtags: [...hashtags, hashtagInput.trim()],
            hashtagInput: '',
            errorMessage: ''
        });
    };

    handleRemoveHashtag = (index) => {
        this.setState((prevState) => ({
            hashtags: prevState.hashtags.filter((_, i) => i !== index)
        }));
    };

    handleAddGenre = (event) => {
        event.preventDefault();
        const { selectedGenre, genres } = this.state;
        if (selectedGenre && !genres.includes(selectedGenre)) {
            this.setState({ genres: [...genres, selectedGenre] });
        }
    };

    handleRemoveGenre = (index) => {
        this.setState((prevState) => ({
            genres: prevState.genres.filter((_, i) => i !== index)
        }));
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        // console.log('Ready to submit data to server...');
    
        const { genres, playlistName, hashtags, image } = this.state;
    
        // Validate that required fields are filled
        if (genres.length === 0 || hashtags.length === 0 || !playlistName) {
            this.setState({ errorMessage: 'Please select at least one playlist hashtag and genre, nameless playlists are not allowed.' });
            return;
        }
    
        try {
            await editPlaylist(sessionStorage.getItem('profileId'), sessionStorage.getItem('playlistId'), {
                newPlaylistName: playlistName,
                newPlaylistImage: image,
                genres: genres,
                hashtags: hashtags
            });
            // console.log('Playlist updated successfully');
        } catch (err) {
            console.error('Error submitting playlist:', err);
            this.setState({ errorMessage: err.message });
        }
    }    

    render() {
        const { playlistName, hashtagInput, hashtags, genres, genreOptions, selectedGenre, errorMessage } = this.state;
        const { onClose } = this.props;

        return (
            <div className="edit-playlist-overlay">
                <div className="edit-playlist-container">
                    <h2>Edit Playlist: {playlistName}</h2>
                    <button className="close-button" onClick={onClose}>x</button>

                    <form onSubmit={this.handleSubmit}>
                        {/* Playlist Name */}
                        <div className="form-groupT">
                            <label htmlFor="playlistName">Playlist Name</label>
                            <input
                                type="text"
                                id="playlistName"
                                name="playlistName"
                                value={playlistName}
                                onChange={this.handleInputChange}
                                required
                            />
                        </div>

                        {/* Playlist Image */}
                        <div className="form-groupT">
                            <label htmlFor="image">Playlist Image (Optional)</label>
                            <input
                                type="file"
                                accept=".jpeg, .png, .jpg"
                                id="image"
                                name="image"
                                onChange={this.handleFileUpload}
                            />
                        </div>

                        {/* Add Hashtags */}
                        <div className="form-group">
                            <label htmlFor="hashtagInput">Add Hashtag</label>
                            <input
                                type="text"
                                id="hashtagInput"
                                name="hashtagInput"
                                value={hashtagInput}
                                onChange={this.handleInputChange}
                            />
                            <button className="add-hashtag-btnT" onClick={this.handleAddHashtag}>Add Hashtag</button>
                        </div>

                        {/* Display added hashtags */}
                        {hashtags.length > 0 && (
                            <div className="hashtag-listT">
                                <h4>Hashtags:</h4>
                                <ul>
                                    {hashtags.map((hashtag, index) => (
                                        <li key={index}>
                                            {hashtag}
                                            <button type="button" className="remove-btnT" onClick={() => this.handleRemoveHashtag(index)}>Remove</button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Genre Dropdown */}
                        <div className="form-groupT">
                            <label htmlFor="selectedGenre">Select Genre</label>
                            <select
                                id="selectedGenre"
                                name="selectedGenre"
                                value={selectedGenre}
                                onChange={this.handleInputChange}
                            >
                                <option value="">Select a genre</option>
                                {genreOptions.map((genre, index) => (
                                    <option key={index} value={genre}>{genre}</option>
                                ))}
                            </select>
                            <button className="add-genre-btnT" onClick={this.handleAddGenre}>Add Genre</button>
                        </div>

                        {/* Display added genres */}
                        {genres.length > 0 && (
                            <div className="genre-listT">
                                <h4>Genres:</h4>
                                <ul>
                                    {genres.map((genre, index) => (
                                        <li key={index}>
                                            {genre}
                                            <button type="button" className="remove-btnT" onClick={() => this.handleRemoveGenre(index)}>Remove</button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Error Message */}
                        {errorMessage && <p className="error-message">{errorMessage}</p>}

                        {/* Buttons */}
                        <div className="button-groupT">
                            <button type="submit" className="submit-btnT">Save Playlist</button>
                            <button type="button" className="cancel-btnT" onClick={onClose}>Cancel</button>
                        </div>
                    </form>
                </div>
                <div className="dark-background"></div>
            </div>
        );
    }
}

EditPlaylist.propTypes = {
    playlist: PropTypes.shape({
        id: PropTypes.oneOfType([
            PropTypes.string.isRequired,
            PropTypes.shape({ $oid: PropTypes.string.isRequired }) // To accommodate MongoDB ID structure
        ]),
        PlayListName: PropTypes.string.isRequired,
        PlayListImage: PropTypes.string, // Optional, if no image is provided
        OwnerImage: PropTypes.string,
        OwnerName: PropTypes.string,
        reference: PropTypes.bool, // Assuming it’s optional if not always present
        genres: PropTypes.arrayOf(PropTypes.string).isRequired,
        hashtags: PropTypes.arrayOf(PropTypes.string).isRequired,
        songs: PropTypes.arrayOf(
            PropTypes.shape({
                title: PropTypes.string.isRequired,
                artists: PropTypes.arrayOf(PropTypes.string).isRequired,
                image: PropTypes.string, // Optional, if image isn't mandatory
                sportifyURL: PropTypes.string.isRequired,
                dateAdded: PropTypes.string.isRequired,
                deleted: PropTypes.bool,
                songId: PropTypes.string.isRequired
            })
        ),
    }),
    profileId: PropTypes.string,
    followers: PropTypes.number,
    onClose: PropTypes.func.isRequired  // Function to close the modal
};