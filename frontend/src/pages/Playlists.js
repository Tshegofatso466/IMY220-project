import React from 'react';
import { Header } from '../components/Header';
import { PlaylistPage } from '../components/PlaylistPage'; // Imported PlaylistPage component
import PropTypes from 'prop-types';
import '../fontDefinition/fonts.css';
import '../../public/assets/styles/PlaylistPage.css'; // Adjusted for new styles

export class Playlists extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            songForm: false,  // Default to songs view
            playListForm: true,
        };
    }

    changeState = (state) => {
        if (state === 'songForm') {
            this.setState({ songForm: true, playListForm: false });
        } else if (state === 'playListForm') {
            this.setState({ songForm: false, playListForm: true });
        }
    };

    render() {
        return (
            <>
                <Header searchQuery={this.props.searchQuery} onChange={this.props.onChange}/>
                <PlaylistPage playLists={this.props.playLists} searchQuery={this.props.searchQuery} onPlaylistClick={this.props.onPlaylistClick} />
            </>
        );
    }
}

Playlists.propTypes = {
    playLists: PropTypes.array.isRequired,
    searchQuery: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onPlaylistClick: PropTypes.func.isRequired,
};