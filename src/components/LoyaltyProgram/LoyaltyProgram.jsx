import React, { useState } from 'react';
import axios from 'axios';
import './LoyaltyProgram.css';

const LoyaltyProgram = () => {
  const [name, setName] = useState('');
  const [discount, setDiscount] = useState('');
  const [upValue, setUpValue] = useState('');
  const [downValue, setDownValue] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name || !discount || !upValue || !downValue) {
      setError('All fields are required.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('/users/save/loyalty/program', {
        name,
        discount: Number(discount),
        upValue: Number(upValue),
        downValue: Number(downValue),
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log(response)

      setSuccess('Loyalty program created successfully!');
      setError('');
      setName('');
      setDiscount('');
      setUpValue('');
      setDownValue('');
    } catch (error) {
      console.error('Error saving loyalty program:', error);
      setError('Failed to create loyalty program.');
      setSuccess('');
    }
  };

  return (
    <div className="loyalty-program-container">
      <div className="loyalty-program-form">
        <h1 className='H1'>Create Loyalty Program</h1>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="loyalty-label">Program Name</label>
            <input
              type="text"
              className="loyalty-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Bronze"
            />
          </div>
          <div className="form-group">
            <label className="loyalty-label">Discount (%)</label>
            <input
              type="number"
              className="loyalty-input"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              placeholder="e.g., 5"
            />
          </div>
          <div className="form-group">
            <label className="loyalty-label">Upper Value</label>
            <input
              type="number"
              className="loyalty-input"
              value={upValue}
              onChange={(e) => setUpValue(e.target.value)}
              placeholder="e.g., 10"
            />
          </div>
          <div className="form-group">
            <label className="loyalty-label">Lower Value</label>
            <input
              type="number"
              className="loyalty-input"
              value={downValue}
              onChange={(e) => setDownValue(e.target.value)}
              placeholder="e.g., 5"
            />
          </div>
          <button type="submit" className="loyalty-button">Create Program</button>
        </form>
      </div>
    </div>
  );
};

export default LoyaltyProgram;