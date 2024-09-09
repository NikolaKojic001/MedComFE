import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './RegisterCompany.css';

const RegisterCompany = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordAgain, setPasswordAgain] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [cityAdmin, setCityAdmin] = useState('');
  const [countryAdmin, setCountryAdmin] = useState('');
  const [cityCompany, setCityCompany] = useState('');
  const [countryCompany, setCountryCompany] = useState('');
  const [profession, setProfession] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const token = localStorage.getItem('token'); 

      const response = await axios.post(
        '/companies/save',
        {
          name,
          email,
          password,
          passwordAgain,
          firstname,
          lastname,
          phonenumber,
          locationAdmin: { city: cityAdmin, country: countryAdmin },
          locationCompany: { city: cityCompany, country: countryCompany },
          profession
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.status === 200) {
        setSuccessMessage('Company successfully registered');
        setTimeout(() => {
          navigate('/admin/dashboard');
        }, 2000); 
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data);
      } else {
        setErrorMessage('An unexpected error occurred. Please try again later.');
      }
    }
  };

  return (
    <div className="register-company-container">
      <h1>Register Company</h1>
      <form className="register-company-form" onSubmit={handleRegister}>
        <div className="form-group">
          <label htmlFor="name">Company Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter company name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="passwordAgain">Confirm Password:</label>
          <input
            type="password"
            id="passwordAgain"
            value={passwordAgain}
            onChange={(e) => setPasswordAgain(e.target.value)}
            placeholder="Confirm password"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="firstname">First Name:</label>
          <input
            type="text"
            id="firstname"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            placeholder="Enter first name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastname">Last Name:</label>
          <input
            type="text"
            id="lastname"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            placeholder="Enter last name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phonenumber">Phone Number:</label>
          <input
            type="text"
            id="phonenumber"
            value={phonenumber}
            onChange={(e) => setPhonenumber(e.target.value)}
            placeholder="Enter phone number"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="cityAdmin">Admin City:</label>
          <input
            type="text"
            id="cityAdmin"
            value={cityAdmin}
            onChange={(e) => setCityAdmin(e.target.value)}
            placeholder="Enter admin city"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="countryAdmin">Admin Country:</label>
          <input
            type="text"
            id="countryAdmin"
            value={countryAdmin}
            onChange={(e) => setCountryAdmin(e.target.value)}
            placeholder="Enter admin country"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="cityCompany">Company City:</label>
          <input
            type="text"
            id="cityCompany"
            value={cityCompany}
            onChange={(e) => setCityCompany(e.target.value)}
            placeholder="Enter company city"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="countryCompany">Company Country:</label>
          <input
            type="text"
            id="countryCompany"
            value={countryCompany}
            onChange={(e) => setCountryCompany(e.target.value)}
            placeholder="Enter company country"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="profession">Profession:</label>
          <input
            type="text"
            id="profession"
            value={profession}
            onChange={(e) => setProfession(e.target.value)}
            placeholder="Enter profession (optional)"
          />
        </div>
        <button type="submit" className="register-button">Register</button>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default RegisterCompany;