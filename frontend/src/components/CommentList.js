import React from 'react';
import PropTypes from 'prop-types';
import { Comment } from './Comment'; // Import the Comment component
import '../../public/assets/styles/CommentList.css'; // Custom CSS for CommentList

export class CommentList extends React.Component {
    render() {
        const { comments, onClose } = this.props;

        return (
            <div className="comment-list-overlay">
                <div className="comment-list-container">
                    <button className="close-btn" onClick={onClose}>X</button>
                    <h2>Comments</h2>
                    <div className="comment-list">
                        {comments.length === 0 ? (
                            <p>No comments available.</p>
                        ) : (
                            comments.map((comment, index) => (
                                <Comment
                                    key={index}
                                    profileImage={comment.profileImage}
                                    userName={comment.userName}
                                    followers={comment.followers}
                                    commentText={comment.commentText}
                                    timestamp={comment.timestamp}
                                    pinned={comment.pinned}
                                    commentId={comment.commentId}
                                    image={comment.image? comment.image: null}
                                />
                            ))
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

// Prop validation
CommentList.propTypes = {
    comments: PropTypes.arrayOf(
        PropTypes.shape({
            profileImage: PropTypes.string.isRequired,
            userName: PropTypes.string.isRequired,
            followers: PropTypes.number.isRequired,
            commentText: PropTypes.string.isRequired,
            timestamp: PropTypes.string.isRequired
        })
    ).isRequired,
    //onClose: PropTypes.func.isRequired
};