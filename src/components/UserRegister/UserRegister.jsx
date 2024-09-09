// src/components/UserRegister/UserRegister.jsx

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './UserRegister.css'; 

const UserRegister = () => {
  const [email, setEmail] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [password, setPassword] = useState('');
  const [passwordAgain, setPasswordAgain] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    const userData = {
      email,
      firstname,
      lastname,
      phonenumber,
      password,
      passwordAgain,
      location: {
        city,
        country,
      },
      role: 'User', 
    };

    try {
      const response = await axios.post('/users/save', userData);

      if (response.status === 200) {
        setSuccessMessage('You successfully registered as a User!');
        setEmail('');
        setFirstname('');
        setLastname('');
        setPhonenumber('');
        setPassword('');
        setPasswordAgain('');
        setCity('');
        setCountry('');
      }
      navigate('/');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage('Error during registration. Please check your inputs.');
      } else {
        setErrorMessage('An unexpected error occurred. Please try again later.');
      }
    }
  };

  return (
    <div className="register-register-container">
      <div className="register-register-left">
        <h1 className="register-brand-title">MEDcom</h1>
        <p className="register-brand-subtitle">Join MEDcom today! Fill out the form to create your account.</p>
      </div>
      <div className="register-register-right">
        <div className="register-form-container">
          <form className="register-register-form" onSubmit={handleRegister}>
            <div className="register-form-group-left">
              <div className="register-form-group">
                <label htmlFor="register-email">Email:</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="register-form-group">
                <label htmlFor="firstname">First Name:</label>
                <input
                  type="text"
                  id="firstname"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  required
                />
              </div>
              <div className="register-form-group">
                <label htmlFor="lastname">Last Name:</label>
                <input
                  type="text"
                  id="lastname"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  required
                />
              </div>
              <div className="register-form-group">
                <label htmlFor="phonenumber">Phone Number:</label>
                <input
                  type="text"
                  id="phonenumber"
                  value={phonenumber}
                  onChange={(e) => setPhonenumber(e.target.value)}
                  required
                />
              </div>
              <div className="register-form-group">
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="register-form-group">
                <label htmlFor="passwordAgain">Confirm Password:</label>
                <input
                  type="password"
                  id="passwordAgain"
                  value={passwordAgain}
                  onChange={(e) => setPasswordAgain(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="register-form-group-right">
              <div className="register-form-group">
                <label htmlFor="city">City:</label>
                <input
                  type="text"
                  id="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
              </div>
              <div className="register-form-group">
                <label htmlFor="country">Country:</label>
                <input
                  type="text"
                  id="country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  required
                />
              </div>
            </div>
            <button type="submit" className="register-register-button">Register</button>
            {errorMessage && <p className="register-error-message">{errorMessage}</p>}
            {successMessage && <p className="register-success-message">{successMessage}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;