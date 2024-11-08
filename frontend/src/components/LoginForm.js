import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../fontDefinition/fonts.css';
import { login } from '../api';
import '../../public/assets/styles/LoginForm.css';
import withNavigation from '../hoc.js';  // Import the HOC

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            username: '',
            password: '',
            errors: {},
        };
    }

    // Function to handle input changes
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    // Function to validate the form fields
    validateForm = () => {
        const { email, username, password } = this.state;
        const errors = {};

        // Validate email format
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            errors.email = 'Please enter a valid email address';
        }

        // Validate username and password length (min length = 6)
        if (username.length < 6) {
            errors.username = 'Username must be at least 6 characters long';
        }

        if (password.length < 6) {
            errors.password = 'Password must be at least 6 characters long';
        }

        return errors;
    };

    // Function to handle form submission
    handleSubmit = async (e) => {
        e.preventDefault();
        const errors = this.validateForm();

        if (Object.keys(errors).length === 0) {
            // Proceed with login logic (e.g., API call)
            // console.log('Form submitted successfully:', this.state);

            const data = { email: this.state.email, username: this.state.username, password: this.state.password };
            const dataS = await this.props.Login(data);

            if (dataS.loggedIn) {
                // console.log('navigating to playlists');
                if (dataS.isAdmin) {
                    // console.log("Navigating to Admin page after login");
                    // console.log('navigating to admin......');
                    this.props.navigate('/Admin');
                } else {
                    // console.log("Navigating to playlist page after login");
                    // console.log('navigating to playlists.......');
                    this.props.navigate('/playlist');
                }
                // console.log('navigating to playlists');
            } else {
                // Handle login failure
                this.setState({ errors: { login: 'Login failed. Please try again.' } });
            }
        } else {
            // Set errors to state
            this.setState({ errors });
        }
    };

    render() {
        const { email, username, password, errors } = this.state;
        const { onClose } = this.props;

        return (
            <div className="login-form-overlay">
                <div className="login-form-container">
                    {/* Close button */}
                    <button className="close-btn" onClick={onClose}>X</button>

                    {/* Login form */}
                    <h2>Login</h2>
                    <form onSubmit={this.handleSubmit}>
                        {/* Email input */}
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input
                                type="text"
                                name="email"
                                value={email}
                                onChange={this.handleChange}
                                placeholder="Enter your email"
                                className={errors.email ? 'error' : ''}
                            />
                            {errors.email && <div className="error-message">{errors.email}</div>}
                        </div>

                        {/* Username input */}
                        <div className="form-group">
                            <label htmlFor="username">Username:</label>
                            <input
                                type="text"
                                name="username"
                                value={username}
                                onChange={this.handleChange}
                                placeholder="Enter your username"
                                className={errors.username ? 'error' : ''}
                            />
                            {errors.username && <div className="error-message">{errors.username}</div>}
                        </div>

                        {/* Password input */}
                        <div className="form-group">
                            <label htmlFor="password">Password:</label>
                            <input
                                type="password"
                                name="password"
                                value={password}
                                onChange={this.handleChange}
                                placeholder="Enter your password"
                                className={errors.password ? 'error' : ''}
                            />
                            {errors.password && <div className="error-message">{errors.password}</div>}
                        </div>

                        {/* Submit button */}
                        <button type="submit" className="submit-btn">Login</button>
                    </form>
                </div>
            </div>
        );
    }
}

// Prop validation
LoginForm.propTypes = {
    onClose: PropTypes.func.isRequired,
    Login: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired, // Expect navigate function as prop
};

// Wrap LoginForm with the `withNavigation` HOC
export default withNavigation(LoginForm);