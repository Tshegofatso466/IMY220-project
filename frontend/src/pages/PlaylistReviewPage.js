import React from 'react';
import PropTypes from 'prop-types';
import PlaylistView from '../components/PlaylistView';
import Header from '../components/Header';
// import '../../public/assets/styles/PlaylistView.css';

export class PlaylistReviewPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <Header searchQuery={this.props.searchQuery} onChange={this.props.onChange}/>
                <PlaylistView />
            </>
        );
    }
}

PlaylistReviewPage.propTypes = {
    searchQuery: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};