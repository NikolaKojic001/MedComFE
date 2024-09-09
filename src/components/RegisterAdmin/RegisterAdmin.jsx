import React, { useState } from 'react';
import axios from 'axios';
import './RegisterAdmin.css';

const RegisterAdmin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    passwordAgain: '',
    firstname: '',
    lastname: '',
    city: '',
    country: '',
    phonenumber: '',
    role: 'Admin', 
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await axios.post('/users/save', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, 
        },
      });

      if (response.status === 200) {
        setSuccessMessage('Successfully registered new admin.');
        setFormData({
          email: '',
          password: '',
          passwordAgain: '',
          firstname: '',
          lastname: '',
          city: '',
          country: '',
          phonenumber: '',
          role: 'Admin',
        });
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data);
      } else if (error.response && error.response.status === 401) {
        setErrorMessage('Unauthorized. Only admins can register new users.');
      } else {
        setErrorMessage('An unexpected error occurred. Please try again later.');
      }
    }
  };

  return (
    <div className="register-admin-container">
      <h2>Register New Admin</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <form className="register-admin-form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="passwordAgain"
          placeholder="Confirm Password"
          value={formData.passwordAgain}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="firstname"
          placeholder="First Name"
          value={formData.firstname}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="lastname"
          placeholder="Last Name"
          value={formData.lastname}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="country"
          placeholder="Country"
          value={formData.country}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="phonenumber"
          placeholder="Phone Number"
          value={formData.phonenumber}
          onChange={handleChange}
          required
        />
        <button type="submit">Register Admin</button>
      </form>
    </div>
  );
};

export default RegisterAdmin;