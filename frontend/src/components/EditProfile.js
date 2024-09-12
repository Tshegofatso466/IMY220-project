import React from 'react';
import PropTypes from 'prop-types';
import '../../public/assets/styles/EditProfile.css'; // Assuming the CSS file will handle the styling

export class EditProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: this.props.userName,
            bio: this.props.bio,
            error: ''
        };
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    handleFormSubmit = (event) => {
        event.preventDefault();
        const { userName, bio } = this.state;

        if (userName.trim() === '' || bio.trim() === '') {
            this.setState({ error: 'Both username and bio must be filled out.' });
        } else {
            // Here you would usually send the updated data to a backend
            this.setState({ error: '' });
            this.props.onClose();  // Close the modal after successful validation
        }
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