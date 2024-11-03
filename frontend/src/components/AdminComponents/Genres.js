import React from 'react';
import PropTypes from 'prop-types';
import { getGenres, genreAction } from '../../api'
import '../../../public/assets/styles/AdminStyles/Genres.css';
import '../../fontDefinition/fonts.css';
import withNavigation from '../../hoc.js';

class Genres extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            genres: [],
            newGenre: '' // State for the new genre input
        };
    }

    async componentDidMount() {
        try {
            const genres = await getGenres();
            this.setState({ genres });
        }
        catch (error) {
            console.error(error);
        }
        // this.setState({ genres: this.props.genres });
    }

    handleAddGenre = async () => {
        try {
            const { newGenre, genres } = this.state;
            if (newGenre.trim() === '') { return; }
            const response = await genreAction(true, this.state.newGenre);
            if (!response.error) {
                if (newGenre.trim()) {
                    this.setState({
                        genres: [...genres, newGenre.trim()], // Add new genre to the list
                        newGenre: '' // Clear the input field
                    });
                }
            }
        }
        catch (error) {
            console.error(error);
        }
    }

    handleDeleteGenre = async (genreToDelete) => {
        try {
            const response = await genreAction(false, genreToDelete);
            if (!response.error) {
                this.setState(prevState => ({
                    genres: prevState.genres.filter(genre => genre !== genreToDelete) // Remove the genre from the list
                }));
            }
        }
        catch (err) {
            console.error(err);
        }
    }

    render() {
        const { genres, newGenre } = this.state;

        return (
            <div className="genres">
                <h2>Genres</h2>
                <input
                    type="text"
                    value={newGenre}
                    onChange={(e) => this.setState({ newGenre: e.target.value })} // Update newGenre state on input change
                    placeholder="Add new genre"
                    className='input'
                />
                <button className="button add" onClick={this.handleAddGenre}>Add Genre</button>

                <ul>
                    {genres.map((genre, index) => (
                        <li key={index} className="genre-item">
                            {genre}
                            <button className="button" onClick={() => this.handleDeleteGenre(genre)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

Genres.propTypes = {
    genres: PropTypes.array.isRequired
};

export default withNavigation(Genres);