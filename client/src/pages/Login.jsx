// src/pages/Login.jsx
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/Login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    // Get user type from query parameter
    const query = new URLSearchParams(location.search);
    const userType = query.get('type'); // 'admin' or 'client'

    useEffect(() => {
        // Redirect to home if userType is invalid
        if (!['admin', 'client'].includes(userType)) {
            navigate('/');
        }
    }, [userType, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password, role: userType }),
            });

            const data = await response.json();
            if (response.ok) {
                // Store user role in localStorage (simplified auth)
                localStorage.setItem('userRole', userType);
                // Redirect based on user type
                navigate(userType === 'admin' ? '/admin' : '/client');
            } else {
                setError(data.error || 'Invalid email or password');
            }
        } catch (err) {
            setError('An error occurred. Please try again later.');
        }
    };

    return (
        <section className="login-page">
            <div className="login-container">
                <h2>Login as {userType === 'admin' ? 'Admin' : 'Client'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    {error && <div className="error">{error}</div>}
                    <button type="submit" className="login-button">Login</button>
                </form>
            </div>
        </section>
    );
}

export default Login;