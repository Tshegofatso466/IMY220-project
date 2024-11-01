import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../api'
import '../../public/assets/styles/AddSong.css';

export class AddSong extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            songName: '',
            artistInput: '',
            artists: [],
            songURL: '',
            image: '',
            errorMessage: '',
            songs: []
        };
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    handleAddArtist = (event) => {
        event.preventDefault();
        const { artistInput, artists } = this.state;

        // Prevent empty artist entries
        if (artistInput.trim() === '') {
            this.setState({ errorMessage: 'Artist name cannot be empty' });
            return;
        }

        // Add artist to the artists array and clear the input field
        this.setState({
            artists: [...artists, artistInput.trim()],
            artistInput: '',
            errorMessage: ''
        });
    };

    handleRemoveArtist = (indexToRemove) => {
        this.setState((prevState) => ({
            artists: prevState.artists.filter((_, index) => index !== indexToRemove)
        }));
    };

    isValidSpotifySongURL = (url) => {
        const spotifyPattern = /^https:\/\/open\.spotify\.com\/track\/[A-Za-z0-9]+(\?.*)?$/;
        return spotifyPattern.test(url);
        //https://open.spotify.com/track/1cpEKqRRI4O7U5tQyS1DeC?si=c56733e8c2124f68
    };

    convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    }

    handleFileUpload = async (e) => {
        const file = e.target.files[0];
        const base64 = await this.convertToBase64(file);
        // console.log(base64);
        this.setState({ image: base64 });
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        const { songName, artists, songURL, image } = this.state;
        const { songs } = this.props
        const vcalidUR = this.isValidSpotifySongURL(songURL);
        // console.log(this.state);
        // console.log(vcalidUR);
        // Ensure that both songName and artists have values
        if (!songName || !image || artists.length === 0 || !this.isValidSpotifySongURL(songURL)) {
            this.setState({ errorMessage: 'Please enter a song name, at least one artist, a (valid) spotify url and a song image.' });
            return;
        }
        //console.log(songs);

        const songExists = songs.some(song => 
            song.title === songName || 
            JSON.stringify(song.artists) === JSON.stringify(artists)
        );
    
        if (songExists) {
            if (!confirm('A song with the same name or artists already exists in this playlist. Do you want to continue adding it?')) {
                return;
            }
        }

        try {
            const song = {
                title: songName,
                artists: artists,
                spotifyURL: songURL,
                image: image
            }

            const response = await addSong(sessionStorage.getItem('userId'), sessionStorage.getItem('playlistId'), song);
            if (response.status !== 201) {
                this.setState({ errorMessage: response.error });
            }
            alert('song added successfully');
        } catch (err) {
            console.error(err);
            return;
        }

        // Process the new song (integrate your API or backend logic here)
        // console.log('New Song:', { songName, artists, songURL });
        this.props.onClose(); // Close modal after submitting
    };

    render() {
        const { songName, artistInput, artists, errorMessage, songURL } = this.state;

        return (
            <div className="modal-overlay">
                <div className="modal-content">
                    <h2>Add a New Song</h2>
                    <form onSubmit={this.handleSubmit}>
                        {/* Song Name */}
                        <div className="form-group">
                            <label htmlFor="songURL">Spotify Song-Link</label>
                            <input
                                type="text"
                                id="songURL"
                                name="songURL"
                                value={songURL}
                                onChange={this.handleInputChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="songName">Song Name</label>
                            <input
                                type="text"
                                id="songName"
                                name="songName"
                                value={songName}
                                onChange={this.handleInputChange}
                                required
                            />
                        </div>

                        <div className='form-group'>
                            <label htmlFor="image">Song-Picture:</label>
                            <input
                                type="file"
                                accept=".jpeg, .png, .jpg"
                                id='image'
                                name='image'
                                onChange={this.handleFileUpload}
                                required
                            />
                        </div>

                        {/* Add Artists */}
                        <div className="form-group">
                            <label htmlFor="artistInput">Artists</label>
                            <input
                                type="text"
                                id="artistInput"
                                name="artistInput"
                                value={artistInput}
                                onChange={this.handleInputChange}
                            />
                            <button className="add-artist-btn" onClick={this.handleAddArtist}>Add Artist</button>
                        </div>

                        {/* Display added artists */}
                        {artists.length > 0 && (
                            <div className="artist-list">
                                <h4>Artists:</h4>
                                <ul>
                                    {artists.map((artist, index) => (
                                        <li key={index}>
                                            {artist}
                                            <button type="button" className="remove-btn" onClick={() => this.handleRemoveArtist(index)}>Remove</button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Error Message */}
                        {errorMessage && <p className="error-message">{errorMessage}</p>}

                        {/* Buttons */}
                        <div className="button-group">
                            <button type="submit" className="submit-btn">Add Song</button>
                            <button type="button" className="cancel-btn" onClick={this.props.onClose}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

AddSong.propTypes = {
    onClose: PropTypes.func.isRequired, // Function to close the modal
    songs: PropTypes.array
};