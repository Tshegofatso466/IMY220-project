import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from'react-router-dom';
import '../fontDefinition/fonts.css';
import '../../public/assets/styles/LoginForm.css'; // Custom CSS for LoginForm

export class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            username: '',
            password: '',
            errors: {},
            LoggedIn: false
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
    handleSubmit = (e) => {
        e.preventDefault();
        const errors = this.validateForm();

        if (Object.keys(errors).length === 0) {
            // No errors, proceed with login logic (e.g., API call)
            console.log('Form submitted successfully:', this.state);
        } else {
            // Set errors to state
            this.setState({ errors });
        }
    };

    goThrough = () => {
        const errors = this.validateForm();

        if(Object.keys(errors).length === 0) {
            // No errors, proceed with login logic (e.g., API call)
            alert('Form submitted successfully:', this.state);
            this.setState({ LoggedIn: true });
        }
    }

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
                        <Link to={this.state.LoggedIn ? "/playlist" : ""}>
                            <button onClick={this.goThrough} type="submit" className="submit-btn">Login</button>
                        </Link>
                        {/* <button type="submit" className="submit-btn">Login</button> */}
                    </form>
                </div>
            </div>
        );
    }
}

// Prop validation
LoginForm.propTypes = {
    onClose: PropTypes.func.isRequired
};