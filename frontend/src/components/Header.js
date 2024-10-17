import React from 'react';
import { SearchBar } from './SearchBar'; // Importing SearchBar
import LoginForm from './LoginForm'; // Importing LoginForm
import { SignUpForm } from './SignUpForm'; // Importing SignUpForm
import '../fontDefinition/fonts.css';
import { Link } from'react-router-dom'; // Importing Link for navigation
import '../../public/assets/styles/Header.css';
import '../index.css';
import withNavigation from '../hoc.js';  // Import the HOC

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userLoggedIn: false, // Eventually, this will be passed in as a prop
            showLoginForm: false, // Controls the visibility of the login form
            showSignUpForm: false // Controls the visibility of the sign-up form
        };
    }

    // Toggle function for login form visibility
    toggleLoginForm = () => {
        this.setState((prevState) => ({
            showLoginForm: !prevState.showLoginForm,
            showSignUpForm: false // Ensure only one form is visible at a time
        }));
    };

    // Toggle function for sign-up form visibility
    toggleSignUpForm = () => {
        this.setState((prevState) => ({
            showSignUpForm: !prevState.showSignUpForm,
            showLoginForm: false // Ensure only one form is visible at a time
        }));
    };

    redirectToHome = () => {
        this.props.navigate('/playlist'); // Navigate to the home page
    }

    redirectToProfile = () => { 
        this.props.navigate('/profile'); // Navigate to the profile page
    }

    render() {
        const { showLoginForm, showSignUpForm } = this.state;

        return (
            <header className="header-container">
                <div className="left-section">
                    <img src="/assets/icons/menu-burger.png" alt="Sidebar Opener" className="sidebar-icon" />
                    <img src="/assets/images/LOGO/Thunder_logo.png" alt="Logo" className="logo-icon" onClick={this.redirectToHome}/>
                </div>
                <div className="middle-section">
                    <SearchBar searchQuery={this.props.searchQuery} onChange={this.props.onChange} />
                </div>
                <div className="right-section">
                    <button className="login-btn" onClick={this.toggleLoginForm}>Login</button>
                    <button className="signup-btn" onClick={this.toggleSignUpForm}>Sign up</button>
                    <img src="/assets/icons/comment-alt.png" alt="Chat Icon" className="chat-icon" />
                    <Link to="/profile">
                        <img src="/assets/icons/user.png" alt="user Icon" className="user-icon" />
                    </Link>
                </div>

                {/* Conditionally render the LoginForm */}
                {showLoginForm && <LoginForm onClose={this.toggleLoginForm} />}

                {/* Conditionally render the SignUpForm */}
                {showSignUpForm && <SignUpForm onClose={this.toggleSignUpForm} />}
            </header>
        );
    }
}

export default withNavigation(Header);