import React from 'react';
import PropTypes from 'prop-types';
import { pinComment } from '../api'
import '../fontDefinition/fonts.css';
import '../../public/assets/styles/PinComment.css';

export class PinComment extends React.Component {
    constructor(props) {
        super(props);
    }

    handlePinToggle = async () => {
        // Here, you can handle the pin/unpin action based on the `commentId`
        const action = this.props.pinned ? "unpin" : "pin";
        // console.log(`Attempting to ${action} comment with ID: ${this.props.commentId}`);
        // Additional logic for pinning/unpinning can be added here

        try {
            const response = await pinComment(sessionStorage.getItem('userId'), sessionStorage.getItem('playlistId'), this.props.commentId, !this.props.pinned);
            // console.log(`Comment ${action}ned successfully`, response);

            this.props.onClose();
        } catch (error) {
            console.error(`Failed to ${action} comment`, error);
        }
    };

    render() {
        const { pinned, onClose } = this.props;

        return (
            <div className="pin-comment-overlay">
                {/* "X" button to close the modal */}
                <button onClick={onClose} className="close-modal-button">X</button>

                <button
                    onClick={this.handlePinToggle}
                    className="pin-comment-button"
                >
                    {pinned ? 'Unpin' : 'Pin'}
                </button>
            </div>
        );
    }
}

PinComment.propTypes = {
    pinned: PropTypes.bool.isRequired,
    commentId: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired
};