import React from 'react';
import PropTypes from 'prop-types';
import '../fontDefinition/fonts.css';
import '../../public/assets/styles/Song.css';


export class Song extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className='general'>
                <img src={this.props.image || '/assets/images/SONGS-IMAGES/esangweni-murumba.jpg'} alt='song image' />
                <div className='details'>
                    <h3>{this.props.title}  <a href={this.props.sportifyURL || '#noUrlProvided'}>(see more)</a></h3>
                    <label>{this.props.artists.join(', ')}</label>
                </div>
                <img src={"/assets/icons/menu-dots-vertical.png"} />
            </div>
        );
    }
}

Song.propTypes = {
    title: PropTypes.string.isRequired,
    artists: PropTypes.arrayOf(PropTypes.string).isRequired,
    image: PropTypes.string,
    sportifyURL: PropTypes.string
}