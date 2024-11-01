import React from 'react';
import PropTypes from 'prop-types';
import { updateProfile } from '../api';
import '../../public/assets/styles/EditProfile.css'; // Assuming the CSS file will handle the styling

export class EditProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: this.props.userName,
            bio: this.props.bio,
            error: '',
            profilePicture: '',
        };
    }

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
        // console.log('bio:', this.state.bio, 'username: ', this.state.userName, base64);
        this.setState({ profilePicture: base64 });
    };

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    handleFormSubmit = (event) => {
        event.preventDefault();
        const { userName, bio, profilePicture } = this.state;

        if (userName.trim() === '' || bio.trim() === '') {
            this.setState({ error: 'Both username and bio must be filled out.' });
        } else {
            let response = updateProfile({ username: userName, bio: bio, profileImage: profilePicture, userId: sessionStorage.getItem('userId') });
            // console.log(response);
            this.setState({ error: '' });
            this.props.onClose();
        }
    };

    // handleSelectProfileImage = (event) => {
    //     event.preventDefault();
    // }

    handleDragOver = (e) => {
        e.preventDefault(); // Prevents the default behavior (which prevents the file from being opened)
    };

    handleDrop = async (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0]; // Get the file being dragged
        //if (file && (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg')) {
            const base64 = await this.convertToBase64(file);
            this.setState({ profilePicture: base64 }); // Update the profile picture state with the new image
            // console.log(this.state.profilePicture);
        //} else {
            //alert('Please drop a valid image file.');
        //}
    };

    render() {
        const { error, userName, bio } = this.state;
        const { onClose } = this.props;

        return (
            <div className="edit-profile-overlay">
                <div className="edit-profile-container">
                    {/* Close Button */}
                    <button className="close-btn" onClick={onClose}>X</button>

                    {/* Heading */}
                    <h2>Edit Profile</h2>

                    {/* Error Message */}
                    {error && <div className="error-message">{error}</div>}

                    {/* Form */}
                    <form onSubmit={this.handleFormSubmit}>
                        <div className="form-group">
                            <label htmlFor="userName">Username:</label>
                            <input
                                type="text"
                                id="userName"
                                name="userName"
                                defaultValue={userName}
                                onChange={this.handleInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="bio">Bio:</label>
                            <textarea
                                id="bio"
                                name="bio"
                                defaultValue={bio}
                                onChange={this.handleInputChange}
                            ></textarea>
                        </div>

                        <div className='form-group'>
                            <label>Profile-Picture:</label>
                            <input
                                type="file"
                                accept=".jpeg, .png, .jpg"
                                onDragOver={this.handleDragOver}
                                onDrop={this.handleDrop}
                                id='profilePicture'
                                name='profilePicture'
                                onChange={this.handleFileUpload}
                            />
                        </div>

                        {/* Save Button */}
                        <button type="submit" className="save-btn">Save</button>
                    </form>
                </div>
            </div>
        );
    }
}

// Prop validation
EditProfile.propTypes = {
    userName: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired
};