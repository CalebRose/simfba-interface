import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormInput from '../FormInput/FormInput';
import './SignUpPage.style.css';
import {
    getAuth,
    createUserWithEmailAndPassword,
    sendEmailVerification
} from 'firebase/auth';
import { createUserProfileDocument } from '../../../Firebase/firebase'; // Updated import
import routes from '../../../Constants/routes';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [hasError, setHasError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate(); // useNavigate replaces history.push

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!username || !email || !password || !confirmPassword) {
            alert(
                'WARNING! You need to fill out all input fields in the form.'
            );
            return;
        }
        if (password !== confirmPassword) {
            alert('WARNING! Password does not match Password Confirmation');
            return;
        }

        setIsLoading(true);
        setMessage('Creating your account...');

        try {
            const auth = getAuth();
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            const user = userCredential.user;

            await createUserProfileDocument(user, {
                username,
                team: '',
                teamAbbr: '',
                mascot: '',
                roleID: null
            });

            await sendEmailVerification(user);

            const idToken = await user.getIdToken(true);
            localStorage.setItem('token', idToken);

            setUsername('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setMessage(`Successfully registered. Welcome, ${username}!`);

            setTimeout(() => {
                navigate(routes.USER); // Redirect to user page
            }, 1000);
        } catch (error) {
            console.error(error);
            setMessage(error.message);
            setHasError(true);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="SignUp">
            <div className="row">
                <form onSubmit={handleSubmit}>
                    <FormInput
                        name="username"
                        type="text"
                        value={username}
                        label="Username"
                        handleChange={(e) => setUsername(e.target.value)}
                    />
                    <FormInput
                        name="email"
                        type="email"
                        value={email}
                        label="Email"
                        handleChange={(e) => setEmail(e.target.value)}
                    />
                    <FormInput
                        name="password"
                        type="password"
                        value={password}
                        label="Password"
                        handleChange={(e) => setPassword(e.target.value)}
                    />
                    <FormInput
                        name="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        label="Confirm Password"
                        handleChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <div className="row signup-button">
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Signing Up...' : 'Sign Up'}
                        </button>
                    </div>
                </form>
            </div>
            {message && (
                <div
                    className={`alert ${
                        hasError ? 'alert-danger' : 'alert-success'
                    } mt-2`}
                >
                    {message}
                </div>
            )}
        </div>
    );
};

export default SignUp;
