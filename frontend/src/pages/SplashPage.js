import React from 'react';
import LoginForm from '../components/LoginForm';
import { SignUpForm } from '../components/SignUpForm';
import '../fontDefinition/fonts.css';
import '../../public/assets/styles/Home.css';

export class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showLoginForm: false,
            showSignUpForm: false
        };
    }

    toggleLoginForm = () => {
        this.setState((prevState) => ({
            showLoginForm: !prevState.showLoginForm,
            showSignUpForm: false
        }));
    };

    toggleSignUpForm = () => {
        this.setState((prevState) => ({
            showSignUpForm: !prevState.showSignUpForm,
            showLoginForm: false
        }));
    };

    render() {
        const { showLoginForm, showSignUpForm } = this.state;

        return (
            <div className="home-container">
                <div className="left-section">
                    <img src="/assets/images/LOGO/compaany logo.png" alt="Thunder Logo" className="home-logo" />
                    <div className="description">
                        <hr />
                        <p>Discover, share, and enjoy personalized playlists effortlessly on thunder.</p>
                    </div>
                </div>

                <div className="right-section">
                    <img src="/assets/images/RANDOM/splash.jpg" alt="Background" className="background-image" />
                    <div className="overlay-content">
                        <button className="login-btn" onClick={this.toggleLoginForm}>Log in</button>
                        <button className="signup-btn" onClick={this.toggleSignUpForm}>Sign up</button>
                    </div>
                </div>

                {showLoginForm && <LoginForm onClose={this.toggleLoginForm} Login={this.props.Login} />}
                {showSignUpForm && <SignUpForm onClose={this.toggleSignUpForm} />}
            </div>
        );
    }
}