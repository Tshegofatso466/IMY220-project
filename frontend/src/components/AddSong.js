import React from 'react';
import PropTypes from 'prop-types';
import '../../public/assets/styles/AddSong.css';

export class AddSong extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            songName: '',
            artistInput: '',
            artists: [],
            errorMessage: ''
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

    handleSubmit = (event) => {
        event.preventDefault();
        const { songName, artists } = this.state;

        // Ensure that both songName and artists have values
        if (!songName || artists.length === 0) {
            this.setState({ errorMessage: 'Please enter a song name and at least one artist.' });
            return;
        }

        // Process the new song (integrate your API or backend logic here)
        console.log('New Song:', { songName, artists });
        this.props.onClose(); // Close modal after submitting
    };

    render() {
        const { songName, artistInput, artists, errorMessage } = this.state;

        return (
            <div className="modal-overlay">
                <div className="modal-content">
                    <h2>Add a New Song</h2>
                    <form onSubmit={this.handleSubmit}>
                        {/* Song Name */}
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
    onClose: PropTypes.func.isRequired // Function to close the modal
};