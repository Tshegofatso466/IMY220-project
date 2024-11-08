import React from 'react';
import PropTypes from 'prop-types';
import { deleteSong } from '../api'
import '../fontDefinition/fonts.css';
import '../../public/assets/styles/Song.css';

export class Song extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false
        };
    }

    toggleModal = () => {
        this.setState({ showModal: !this.state.showModal });
    };

    handleDelete = async () => {
        const { songId } = this.props
        // console.log(`Deleting song with ID: ${songId}`);
        try {
            const response = await deleteSong(sessionStorage.getItem('userId'), sessionStorage.getItem('playlistId'), songId);
            // console.log(response);
        } catch (e) {
            console.error('Error deleting song: ' + e);
        }
    };

    render() {
        const { title, artists, deleted, image, spotifyURL, dateAdded } = this.props;
        const { showModal } = this.state;
        const sameUser = sessionStorage.getItem('userId') === sessionStorage.getItem('profileId')

        return (
            <div className={`general ${deleted ? 'deleted' : ''}`}>
                <img src={image || '/assets/images/SONGS-IMAGES/esangweni-murumba.jpg'} alt='song image' />
                <div className='details'>
                    <h3>{title} {/*<a href={spotifyURL || '#noUrlProvided'}>(see more)</a>*/}</h3>
                    <label>{artists.join(', ')}</label>
                    <p className='dateAdded'>{dateAdded.slice(0, 10)}</p>
                </div>
                <img
                    className='verticalDots'
                    src={"/assets/icons/menu-dots-vertical.png"}
                    onClick={this.toggleModal}
                    alt="menu"
                />

                {showModal && !deleted && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <button className="close-btn" onClick={this.toggleModal}>X</button>
                            <button className='sportify' onClick={() => window.open(spotifyURL, '_blank')}>See on Spotify</button>
                            {sameUser && <button className='delete' onClick={this.handleDelete}>Delete</button>}
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

Song.propTypes = {
    title: PropTypes.string.isRequired,
    artists: PropTypes.arrayOf(PropTypes.string).isRequired,
    image: PropTypes.string.isRequired,
    spotifyURL: PropTypes.string.isRequired,
    dateAdded: PropTypes.string.isRequired,
    songId: PropTypes.string.isRequired,
    deleted: PropTypes.bool.isRequired
};