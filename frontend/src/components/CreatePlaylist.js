import React from 'react';
import PropTypes from 'prop-types';
import { createPlaylist } from '../api';
import '../../public/assets/styles/CreatePlaylist.css';

export class CreatePlaylist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playlistName: '',
            image: '',
            errorMessage: ''
        };
    }

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

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    validateInput = () => {

        if(!this.state.playlistName){
            this.setState({playlistName: "my-playlist"});
        }

        const { image, playlistName } = this.state;
        if (!image || !playlistName) {
            this.setState({ errorMessage: 'both playlist image and the playlist name are required.' });
            return false;
        }
        return true;
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        if (this.validateInput()) {
            const { image, playlistName } = this.state;
            // console.log()
            try{
                const response = await createPlaylist(sessionStorage.getItem('userId'), {playlistName: playlistName, playlistImage: image});
                if(response.error) {
                    console.error('Failed to create playlist:', response.error);
                }
            }
            catch (err) {
                console.error('Error creating playlist:', err);
                this.setState({ errorMessage: err.message });
            }
            // console.log('Creating playlist with data:', this.state.playlistName, this.state.image);
            this.props.onClose(); // Close the modal after submission
        }
    };

    render() {
        const { playlistName, errorMessage } = this.state;

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
                            <label htmlFor="image">Playlist Image</label>
                            <input
                                type="file"
                                id="image"
                                name="image"
                                accept=".jpeg, .png, .jpg"
                                // value={numberOfSongs}
                                onChange={this.handleFileUpload}
                                required
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