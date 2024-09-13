import React from 'react';
import PropTypes from 'prop-types';
import '../../public/assets/styles/CreateComment.css';

export class CreateComment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            commentText: '',
            errorMessage: ''
        };
    }

    handleInputChange = (event) => {
        this.setState({ commentText: event.target.value });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const { commentText } = this.state;

        if (!commentText.trim()) {
            this.setState({ errorMessage: 'Comment cannot be empty.' });
            return;
        }

        // Add the comment (integrate with your backend or state management here)
        console.log('New Comment:', commentText);
        this.props.onAddComment(commentText); // Function to add comment
        this.props.onClose(); // Close the modal after submitting
    };

    render() {
        const { commentText, errorMessage } = this.state;

        return (
            <div className="modal-overlay">
                <div className="modal-content">
                    <h2>Add a New Comment</h2>
                    <form onSubmit={this.handleSubmit}>
                        {/* Textarea for comment */}
                        <div className="form-group">
                            <label htmlFor="commentText">Your Comment</label>
                            <textarea
                                id="commentText"
                                value={commentText}
                                onChange={this.handleInputChange}
                                rows="4"
                                required
                            ></textarea>
                        </div>

                        {/* Error Message */}
                        {errorMessage && <p className="error-message">{errorMessage}</p>}

                        {/* Buttons */}
                        <div className="button-group">
                            <button type="submit" className="submit-btn">Add Comment</button>
                            <button type="button" className="cancel-btn" onClick={this.props.onClose}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

CreateComment.propTypes = {
    onAddComment: PropTypes.func.isRequired, // Function to add the comment
    onClose: PropTypes.func.isRequired // Function to close the modal
};