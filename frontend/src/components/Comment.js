import React from 'react';
import PropTypes from 'prop-types';
import { ProfilePreview } from './ProfilePreview'; // Assuming ProfilePreview is in the same folder
import '../../public/assets/styles/Comment.css'; // Add custom styles
import '../fontDefinition/fonts.css';

export class Comment extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { profileImage, userName, followers, commentText, timestamp } = this.props;

        return (
            <div className="comment-container">
                {/* Profile Preview */}
                <ProfilePreview
                    profileImage={profileImage}
                    userName={userName}
                    followers={followers}
                />

                {/* Comment text */}
                <div className="comment-content">
                    <p className="comment-text">{commentText}</p>
                    <p className="comment-timestamp">{timestamp}</p>
                </div>
            </div>
        );
    }
}

// Prop validation for Comment component
Comment.propTypes = {
    profileImage: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    followers: PropTypes.number.isRequired,
    commentText: PropTypes.string.isRequired,
    timestamp: PropTypes.string.isRequired,
};