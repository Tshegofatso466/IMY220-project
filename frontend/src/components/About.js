import React from 'react';
import '../../public/assets/styles/LoginForm.css'; // Add custom styles
import '../../public/assets/styles/About.css'
import '../fontDefinition/fonts.css';

export class AboutPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div className="login-form-overlay">
                <div className='login-form-container'>
                    <button className="close-btn" onClick={this.props.onClose}>X</button>
                    <h3>About</h3>
                    <p>
                        Welcome to Thunder, your ultimate playlist-sharing destination designed
                        for music lovers everywhere. With a sleek, modern interface, Thunder
                        allows users to create, share, and explore playlists effortlessly.
                        Whether you're curating tunes for a workout, discovering new artists, or
                        simply sharing your favorite songs with friends, Thunder is built to make
                        every music experience more enjoyable. The platform fosters a dynamic
                        community where music enthusiasts can connect, follow each other's
                        playlists, and engage in conversations about their favorite tracks.
                    </p>
                    <p>
                        At Thunder, we believe music is best when shared. Our goal is to simplify
                        how you discover new music, whether through curated playlists by fellow
                        users or the latest trending collections. With an intuitive design and
                        seamless interaction, Thunder makes it easy for anyone to dive deep into
                        the world of music. Explore new sounds, collaborate with friends on
                        playlists, and make Thunder your go-to platform for all things music.
                    </p>
                </div>
            </div>
        );
    }
}