import React from 'react';
import Feed from './Feed';
import PropTypes from 'prop-types';
import '../fontDefinition/fonts.css';
import '../../public/assets/styles/PlaylistPage.css'; // Adjusted for new styles

export class PlaylistPage extends React.Component {
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
        const { songForm, playListForm } = this.state;

        return (
            <>
                {/* Main background image */}
                <img className="Main" src='/assets/images/RANDOM/latest2.jpg' alt="Background Image" />

                <div className="playlist-page">
                    <div className="header-grid">
                        <div className="form-switch">
                            <label
                                className={songForm ? 'active' : ''}
                                onClick={() => this.changeState('songForm')}
                            >
                                Songs
                            </label>
                            <label
                                className={playListForm ? 'active' : ''}
                                onClick={() => this.changeState('playListForm')}
                            >
                                Playlists
                            </label>
                        </div>
                        <h1 className="static-text">new releases</h1>
                    </div>

                    {/* Song or Playlist Feed */}
                    {songForm && (
                        <div className="song-view">
                            <Feed onPlaylistClick={this.props.onPlaylistClick.bind(this)} songForm={this.state.songForm} playLists={this.props.playLists} searchQuery={this.props.searchQuery} />
                        </div>
                    )}

                    {playListForm && (
                        <div className="playlist-view">
                            <Feed onPlaylistClick={this.props.onPlaylistClick.bind(this)} songForm={this.state.songForm} playLists={this.props.playLists} searchQuery={this.props.searchQuery} />
                        </div>
                    )}
                </div>
            </>
        );
    }
}

PlaylistPage.propTypes = {
    playLists: PropTypes.array.isRequired,
    searchQuery: PropTypes.string.isRequired,
    onPlaylistClick: PropTypes.func.isRequired,
};