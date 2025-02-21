import React, { useState } from 'react';
import FormInput from '../FormInput/FormInput';
import './LoginPage.style.css';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import routes from '../../../Constants/routes';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [hasError, setHasError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setMessage('Attempting Sign In...');

        try {
            const auth = getAuth();
            await signInWithEmailAndPassword(auth, email, password);
            setIsLoading(false);
            setMessage('Sign In successful. Redirecting...');

            const user = auth.currentUser;
            if (user) {
                const idToken = await user.getIdToken(true);
                localStorage.setItem('token', idToken);
            }

            setTimeout(() => {
                navigate(routes.LANDING); // Replaces history.push('/user')
            }, 1000);
        } catch (error) {
            console.error(error);
            setMessage(error.message);
            setHasError(true);
            setIsLoading(false);

            setTimeout(() => {
                setMessage('');
                setHasError(false);
            }, 5000);
        }
    };

    return (
        <div className="LoginPage">
            <div className="row">
                <form>
                    <FormInput
                        name="email"
                        value={email}
                        label="Email"
                        type="email"
                        handleChange={(e) => setEmail(e.target.value)}
                    />
                    <FormInput
                        name="password"
                        value={password}
                        label="Password"
                        type="password"
                        handleChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="row signup-button">
                        <Link to={routes.LANDING}>
                            <button
                                className="btn btn-primary login-button"
                                onClick={handleSubmit}
                            >
                                Login
                            </button>
                        </Link>
                    </div>
                </form>
            </div>
            <div className="row mt-2">
                {message && (
                    <div
                        className={`alert ${
                            hasError ? 'alert-danger' : 'alert-success'
                        }`}
                    >
                        {message}
                    </div>
                )}
            </div>
        </div>
    );
};

export default LoginPage;
