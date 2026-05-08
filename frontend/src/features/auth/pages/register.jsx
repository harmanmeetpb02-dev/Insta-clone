import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Register.css';

const Register = () => {
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        bio: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await axios.post('http://localhost:3000/api/auth/register', formData, {
                withCredentials: true
            });

            if (response.status === 201) {
                console.log('Registration successful:', response.data);
                navigate('/login'); // Redirect to login
            }
        } catch (err) {
            console.error('Registration error detail:', err);
            const errorMessage = err.response?.data?.message || err.message || 'Connection to server failed';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-container">
            <div className="register-box">
                <h1 className="logo">Instagram</h1>
                <p className="tagline">Sign up to see photos and videos from your friends.</p>
                
                <form className="register-form" onSubmit={handleRegister}>
                    <input 
                        type="email" 
                        name="email"
                        placeholder="Email" 
                        className="input-field"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <input 
                        type="text" 
                        name="username"
                        placeholder="Username" 
                        className="input-field"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                    <input 
                        type="text" 
                        name="bio"
                        placeholder="Bio" 
                        className="input-field"
                        value={formData.bio}
                        onChange={handleChange}
                    />
                    <input 
                        type="password" 
                        name="password"
                        placeholder="Password" 
                        className="input-field"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    
                    <button 
                        type="submit" 
                        className="register-button"
                        disabled={loading || !formData.email || !formData.username || formData.password.length < 6}
                    >
                        {loading ? 'Signing up...' : 'Sign Up'}
                    </button>
                </form>

                {error && <p className="error-message">{error}</p>}

                <p className="terms">
                    By signing up, you agree to our Terms, Data Policy and Cookies Policy.
                </p>
            </div>

            <div className="login-redirect-box">
                <p>Have an account? <Link to="/login" className="login-link">Log in</Link></p>
            </div>
        </div>
    );
}

export default Register;