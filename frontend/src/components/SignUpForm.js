import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../fontDefinition/fonts.css';
import '../../public/assets/styles/SignUpForm.css';

export class SignUpForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            surname: '',
            name: '',
            username: '',
            password: '',
            errorMessage: '',
            SignedIn: false
        };
    }

    // Validation for email, username, and password
    validateForm = () => {
        const { email, username, password } = this.state;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (!emailRegex.test(email)) {
            this.setState({ errorMessage: 'Invalid email format' });
            return false;
        }

        if (username.length < 6) {
            this.setState({ errorMessage: 'Username must be at least 6 characters long' });
            return false;
        }

        if (!strongPasswordRegex.test(password)) {
            this.setState({
                errorMessage: 'Password must be at least 8 characters, include an uppercase, lowercase, number, and special character'
            });
            return false;
        }

        return true;
    };

    // Handle form submission
    handleSubmit = (e) => {
        e.preventDefault();
        if (this.validateForm()) {
            alert('Sign-up successful!');
            const { email, password, surname, name, userName } = this.state;
            this.setState({ errorMessage: '', SignedIn: true });
            this.props.goThrough(email, password, surname, name, userName);
        }
    };

    goThrough = () => {
        if (this.validateForm()) {
            alert('Sign-up successful!');
            this.setState({ errorMessage: '', SignedIn: true });
        }
    }

    // Handle input changes
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    render() {
        const { email, surname, name, username, password, errorMessage } = this.state;
        const { onClose } = this.props;

        return (
            <div className="signup-form-overlay">
                <div className="signup-form-container">
                    <button className="close-btn" onClick={onClose}>X</button>
                    <h2>Sign Up</h2>
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                    <form onSubmit={this.handleSubmit}>
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={this.handleChange}
                            required
                        />
                        <label>Surname:</label>
                        <input
                            type="text"
                            name="surname"
                            value={surname}
                            onChange={this.handleChange}
                            required
                        />
                        <label>Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={this.handleChange}
                            required
                        />
                        <label>Username:</label>
                        <input
                            type="text"
                            name="username"
                            value={username}
                            onChange={this.handleChange}
                            required
                        />
                        <label>Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={this.handleChange}
                            required
                        />
                        <Link to={this.state.SignedIn ? "/playlist" : ""}>
                            <button onClick={this.goThrough} type="submit" className="signup-submit-btn">Sign Up</button>
                        </Link>
                    </form>
                </div>
            </div>
        );
    }
}

SignUpForm.propTypes = {
    onClose: PropTypes.func.isRequired
};