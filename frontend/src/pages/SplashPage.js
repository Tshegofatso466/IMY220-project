import React, { Component } from 'react';
import { LoginForm } from '../components/LoginForm';
import { SignUpForm } from '../components/SignUpForm';
import '../fontDefinition/fonts.css';
import '../../public/assets/styles/Home.css'; // Custom styles for Home component

export class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showLoginForm: false,
            showSignUpForm: false
        };
    }

    // Toggle Login Form
    toggleLoginForm = () => {
        this.setState((prevState) => ({
            showLoginForm: !prevState.showLoginForm,
            showSignUpForm: false
        }));
    };

    // Toggle Sign Up Form
    toggleSignUpForm = () => {
        this.setState((prevState) => ({
            showSignUpForm: !prevState.showSignUpForm,
            showLoginForm: false
        }));
    };

    handleLogin = () => {
        // Assuming login is successful, trigger the parent onLogin function
        this.props.onLogin();
    };

    render() {
        const { showLoginForm, showSignUpForm } = this.state;

        return (
            <div className="home-container">
                {/* Left Side: Logo and description */}
                <div className="left-section">
                    <img src="/assets/images/LOGO/compaany logo.png" alt="Thunder Logo" className="home-logo" />
                    <div className="description">
                        <hr />
                        <p>Discover, share, and enjoy personalized playlists effortlessly on thunder.</p>
                        <p>Your next favorite song is just a click away.</p>
                    </div>
                </div>

                {/* Right Side: Background Image and Buttons */}
                <div className="right-section">
                    {/* Background Image */}
                    <img src="/assets/images/RANDOM/splash.jpg" alt="Background" className="background-image" />
                    
                    {/* Buttons and copyright overlaid on the right side */}
                    <div className="overlay-content">
                        <button className="login-btn" onClick={this.toggleLoginForm}>Log in</button>
                        <button className="signup-btn" onClick={this.toggleSignUpForm}>Sign up</button>
                        
                        <div className="bottom-section">
                            <p>Copyright © 2024 thunder.</p>
                            <p>All rights reserved. Published by Tshegofatso Media</p>
                        </div>
                    </div>
                </div>

                {/* Conditionally render the LoginForm */}
                {showLoginForm && <LoginForm onClose={this.toggleLoginForm} />}

                {/* Conditionally render the SignUpForm */}
                {showSignUpForm && <SignUpForm onClose={this.toggleSignUpForm} />}
            </div>
        );
    }
}