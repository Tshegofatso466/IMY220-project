import React from 'react';
import PropTypes from 'prop-types';
import '../fontDefinition/fonts.css';
import '../../public/assets/styles/SearchBar.css';

export class SearchBar extends React.Component {
    constructor(props) {
        super(props);
    }

    handleInputChange = (event) => {
        const value = event.target.value;
        this.props.onChange(value); // Call the passed onChange function to update search query
    };

    render() {
        return (
            <div className="search-container">
                <input 
                    type="text" 
                    placeholder='Search'  // Magnifying glass emoji
                    value={this.props.searchQuery}
                    onChange={this.handleInputChange}
                    className="search-input"
                />
            </div>
        );
    }
}

SearchBar.propTypes = {
    searchQuery: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};
