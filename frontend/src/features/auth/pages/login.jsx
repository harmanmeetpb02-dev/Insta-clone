import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Login = () => {
    const [identifier, setIdentifier] = useState(''); // email or username
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Determine if identifier is email or username
            const isEmail = identifier.includes('@');
            const loginData = isEmail 
                ? { email: identifier, password } 
                : { username: identifier, password };

            const response = await axios.post('http://localhost:3000/api/auth/login', loginData, {
                withCredentials: true
            });

            if (response.status === 200 || response.status === 201) {
                console.log('Login successful:', response.data);
                // In a real app, you'd store the user in context/state
                navigate('/'); // Redirect to home
            }
        } catch (err) {
            console.error('Login error detail:', err);
            const errorMessage = err.response?.data?.message || err.message || 'Connection to server failed';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h1 className="logo">Instagram</h1>
                
                <form className="login-form" onSubmit={handleLogin}>
                    <input 
                        type="text" 
                        placeholder="Phone number, username, or email" 
                        className="input-field"
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                        required
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        className="input-field"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    
                    <button 
                        type="submit" 
                        className="login-button"
                        disabled={loading || !identifier || password.length < 6}
                    >
                        {loading ? 'Logging in...' : 'Log In'}
                    </button>
                </form>

                <div className="divider">
                    <div className="line"></div>
                    <div className="or">OR</div>
                    <div className="line"></div>
                </div>

                <button className="facebook-login">
                    <span>Log in with Facebook</span>
                </button>

                {error && <p className="error-message">{error}</p>}

                <a href="#" className="forgot-password">Forgot password?</a>
            </div>

            <div className="signup-box">
                <p>Don't have an account? <Link to="/register" className="signup-link">Sign up</Link></p>
            </div>

            <div className="get-app">
                <p>Get the app.</p>
                <div className="app-stores">
                    <img src="https://static.cdninstagram.com/rsrc.php/v3/yt/r/Y23_5k5DYWy.png" alt="App Store" />
                    <img src="https://static.cdninstagram.com/rsrc.php/v3/yz/r/c5Rp7YmS_iE.png" alt="Google Play" />
                </div>
            </div>
        </div>
    );
}

export default Login;


