import React from 'react';
import PropTypes from 'prop-types';
import '../fontDefinition/fonts.css';
import '../../public/assets/styles/ProfilePreview.css';

export class ProfilePreview extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        const { profileImage, userName, followers } = this.props;
        return (
            <div className="profile-preview">
                <img src={`${profileImage}`} alt={`${userName}'s profile`} className="profile-picture" />
                <div className="profile-info">
                    <h4>{userName}</h4>
                    <label className="followers-text">{followers} followers</label>
                </div>
            </div>
        );
    }
};

ProfilePreview.propTypes = {
    profileImage: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    followers: PropTypes.number.isRequired,
};
