import React from 'react';
import PropTypes from 'prop-types';
import { PlayList } from './PlayList';
import { Song } from './Song';
import '../fontDefinition/fonts.css';
import '../../public/assets/styles/Feed.css';

export class Feed extends React.Component {
    filterPlaylists = () => {
        const { searchQuery, playLists } = this.props; // Use props for searchQuery

        if (!searchQuery) {
            return playLists;
        }

        return playLists.filter((playlist) =>
            playlist.OwnerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            playlist.PlayListName.toLowerCase().includes(searchQuery.toLowerCase())
        );
    };

    render() {
        const { songForm } = this.props; // Extract songForm prop
        const filteredPlaylists = this.filterPlaylists(); // Filtered playlists based on search query

        // If songForm is true, render individual songs from all playlists
        if (songForm) {
            return (
                <div className="playlist-feed">
                    {filteredPlaylists.map((playlist, playlistIndex) => (
                        <div key={playlistIndex}>
                            <h3>{playlist.PlayListName}</h3> {/* Playlist title above songs */}
                            {playlist.songs.map((song, songIndex) => (
                                <Song
                                    key={songIndex}
                                    title={song.title}
                                    artists={song.artists}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            );
        }

        // Otherwise, render playlists
        return (
            <div className="playlist-feed">
                {filteredPlaylists.map((playlist, index) => (
                    <PlayList
                        key={index}
                        PlayListName={playlist.PlayListName}
                        PlayListImage={playlist.PlayListImage}
                        Ownerimage={playlist.Ownerimage}
                        OwnerName={playlist.OwnerName}
                        songs={playlist.songs}
                        onClick={() => this.props.onPlaylistClick(playlist)}
                    />
                ))}
            </div>
        );
    }
}

Feed.propTypes = {
    playLists: PropTypes.arrayOf(
        PropTypes.shape({
            PlayListName: PropTypes.string.isRequired,
            PlayListImage: PropTypes.string.isRequired,
            Ownerimage: PropTypes.string.isRequired,
            OwnerName: PropTypes.string.isRequired,
            songs: PropTypes.arrayOf(
                PropTypes.shape({
                    title: PropTypes.string.isRequired,
                    artists: PropTypes.arrayOf(PropTypes.string).isRequired
                })
            ).isRequired
        })
    ).isRequired,
    searchQuery: PropTypes.string.isRequired, // Prop for searchQuery
    songForm: PropTypes.bool.isRequired, // Prop to toggle between playlist and song form
    onPlaylistClick: PropTypes.func.isRequired
};