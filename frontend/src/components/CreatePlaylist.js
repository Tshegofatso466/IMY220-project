import React from 'react';
import PropTypes from 'prop-types';
import '../../public/assets/styles/CreatePlaylist.css';

export class CreatePlaylist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playlistName: '',
            numberOfSongs: '',
            errorMessage: ''
        };
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    validateInput = () => {
        const { numberOfSongs } = this.state;
        const songCount = Number(numberOfSongs);

        if (songCount < 0 || songCount > 150) {
            this.setState({ errorMessage: 'The number of songs should be between 0 and 150.' });
            return false;
        }
        return true;
    };

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.validateInput()) {
            // Call a function to create the playlist (you can integrate your backend call here)
            console.log('Creating playlist with data:', this.state.playlistName, this.state.numberOfSongs);
            this.props.onClose(); // Close the modal after submission
        }
    };

    render() {
        const { playlistName, numberOfSongs, errorMessage } = this.state;

        return (
            <div className="modal-overlay">
                <div className="modal-content">
                    <h2>Create New Playlist</h2>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
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
                        <div className="form-group">
                            <label htmlFor="numberOfSongs">Number of Songs</label>
                            <input
                                type="number"
                                id="numberOfSongs"
                                name="numberOfSongs"
                                value={numberOfSongs}
                                onChange={this.handleInputChange}
                                required
                                min="0"
                                max="150"
                            />
                        </div>

                        {errorMessage && <p className="error-message">{errorMessage}</p>}

                        <div className="button-group">
                            <button type="submit" className="submit-btn">Create Playlist</button>
                            <button type="button" className="cancel-btn" onClick={this.props.onClose}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

CreatePlaylist.propTypes = {
    onClose: PropTypes.func.isRequired // Function to close the modal
};