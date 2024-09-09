import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import './Login.css';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      const response = await axios.post('/users/login', { email, password });

      if (response.status === 200) {
        const token = response.data;
        localStorage.setItem('token', token);
        const decodedToken = jwtDecode(token);
        const userRole = decodedToken.role;

        onLogin(token);
        if (userRole === 'Admin') {
          navigate('/admin/dashboard');
        } else if (userRole === 'CompanyAdmin') {
          navigate('/company-admin/dashboard');
        } else {
          navigate('/user/dashboard');
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage('Invalid email or password. Please try again.');
      } else {
        setErrorMessage('An unexpected error occurred. Please try again later.');
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <h1 className="login-brand-title">MEDcom</h1>
        <p className="login-brand-subtitle">Welcome to MEDcom! Please login to continue.</p>
      </div>
      <div className="login-right">
        <div className="login-form-container">
          <form className="login-form" onSubmit={handleLogin}>
            <div className="login-form-group">
              <label htmlFor="email" className="login-label">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="login-input"
                required
              />
            </div>
            <div className="login-form-group">
              <label htmlFor="password" className="login-label">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="login-input"
                required
              />
            </div>
            <button type="submit" className="login-button">Login</button>
            {errorMessage && <p className="login-error-message">{errorMessage}</p>}
            <p className="login-register-link">
              You can create your account <a href="/user/register">here</a>.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;