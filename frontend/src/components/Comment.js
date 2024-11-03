import React from 'react';
import PropTypes from 'prop-types';
import { PinComment } from './PinComment';
import { ProfilePreview } from './ProfilePreview'; // Assuming ProfilePreview is in the same folder
import '../../public/assets/styles/Comment.css'; // Add custom styles
import '../fontDefinition/fonts.css';

export class Comment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showPinOptions: false,
            sameUser: false
        };
    }

    // handleComment = () => {
    //     this.setState((prevState) => ({
    //         showComments: !prevState.showComments,
    //     }));
    // };

    handlemodalClose = () => {
        this.setState({showPinOptions: false});
    }

    componentDidMount(){
        this.setState({sameUser: sessionStorage.getItem('userId') === sessionStorage.getItem('profileId')});
    }

    handleCommentClick = () => {
        const sameUser = sessionStorage.getItem('userId') === sessionStorage.getItem('profileId');
        if (!sameUser) {
            // console.log('hard luck :|');
            return;
        }

        // console.log(`Clicked on comment with ID: ${this.props.commentId}`);
        this.setState(prevState => ({ showPinOptions: !prevState.showPinOptions }));
    }

    render() {
        const { profileImage, userName, followers, commentText, timestamp, pinned, commentId, image } = this.props;
        const { showPinOptions } = this.state;

        return (
            <div className="comment-container" onClick={this.handleCommentClick}>
                {/* Profile Preview */}
                <ProfilePreview
                    profileImage={profileImage}
                    userName={userName}
                    followers={followers}
                />

                {/* Comment text */}
                <div className="comment-content">
                    <p className="comment-text">
                        {pinned && <img src="/assets/icons/thumbtack.png" alt="Pinned Icon" className="pinned-icon" />}
                        {commentText}
                    </p>
                    {image && <div className='image-container'>
                        <img className='comment-image' src={image}/>
                    </div>}
                    <p className="comment-timestamp">{timestamp}</p>
                </div>
                {/* Pin Comment Overlay */}
                {showPinOptions && <PinComment onClose={this.handlemodalClose} pinned={pinned} commentId={commentId} />}
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
    pinned: PropTypes.bool.isRequired,
    commentId: PropTypes.string.isRequired
};