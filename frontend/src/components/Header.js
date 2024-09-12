import React from 'react';
import { SearchBar } from './SearchBar'; // Importing SearchBar
import { LoginForm } from './LoginForm'; // Importing LoginForm
import '../fontDefinition/fonts.css';
import '../../public/assets/styles/Header.css';

export class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userLoggedIn: false, // Eventually, this will be passed in as a prop
            showLoginForm: false  // Controls the visibility of the login form
        };
    }

    // Function to toggle the login form visibility
    toggleLoginForm = () => {
        this.setState((prevState) => ({
            showLoginForm: !prevState.showLoginForm
        }));
    };

    render() {
        const { showLoginForm } = this.state;

        return (
            <header className="header-container">
                <div className="left-section">
                    <img src="/assets/icons/menu-burger.png" alt="Sidebar Opener" className="sidebar-icon"/>
                    <img src="/assets/images/LOGO/Thunder_logo.png" alt="Logo" className="logo-icon" />
                </div>
                <div className="middle-section">
                    <SearchBar searchQuery={this.props.searchQuery} onChange={this.props.onSearchChange} />
                </div>
                <div className="right-section">
                    <button className="login-btn" onClick={this.toggleLoginForm}>Login</button>
                    <button className="signup-btn">Sign up</button>
                    <img src="/assets/icons/comment-alt.png" alt="Chat Icon" className="chat-icon" />
                </div>

                {/* Conditionally render the LoginForm */}
                {showLoginForm && (
                    <LoginForm onClose={this.toggleLoginForm} />
                )}
            </header>
        );
    }
}