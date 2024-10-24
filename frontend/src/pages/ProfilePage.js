import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Profile from '../components/Profile'; // Importing the Profile component

export class ProfilePage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <>
                <Header searchQuery={this.props.searchQuery} onChange={this.props.onChange} />
                <Profile />
            </>
        );
    }
}