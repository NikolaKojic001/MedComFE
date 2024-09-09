import React, { useState } from 'react';
import axios from 'axios';
import './GradeCompany.css';

const GradeCompany = ({ companyID, token, onClose }) => {
  const [selectedDescriptions, setSelectedDescriptions] = useState([]);
  const [customDescription, setCustomDescription] = useState('');
  const [grade, setGrade] = useState(1);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const descriptionArray = [...selectedDescriptions];
    if (customDescription) {
      descriptionArray.push(customDescription);
    }

    console.log('companyID:', companyID);
    console.log('token:', token);
    console.log('descriptionArray:', descriptionArray);
    console.log('grade:', grade);

    setSuccessMessage('');
    setErrorMessage('');

    try {
      await axios.post(
        '/companies/grade',
        { description: descriptionArray, grade },
        { headers: { 'Authorization': `Bearer ${token}`, 'CompanyID': companyID } }
      );
      setSuccessMessage('Grade successfully submitted');
      setSelectedDescriptions([]);
      setCustomDescription('');
      setGrade(1);
      if (onClose) onClose();
    } catch (error) {
      console.error("Error while submitting grade:", error);
      setErrorMessage('Failed to submit grade');
    }
  };

  const handleDescriptionChange = (e) => {
    const { value, checked } = e.target;
    setSelectedDescriptions(prev =>
      checked ? [...prev, value] : prev.filter(desc => desc !== value)
    );
  };

  return (
    <div className="grade-modal">
      <div className="modal-content">
        <h2>Grade Company</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <div className="description-options">
              <label>
                <input
                  type="checkbox"
                  value="cistoca"
                  onChange={handleDescriptionChange}
                />
                Čistoća
              </label>
              <label>
                <input
                  type="checkbox"
                  value="ljubaznost"
                  onChange={handleDescriptionChange}
                />
                Ljubaznost
              </label>
              <label>
                <input
                  type="checkbox"
                  value="korektnost"
                  onChange={handleDescriptionChange}
                />
                Korektnost
              </label>
              <label>
                <input
                  type="checkbox"
                  value="cena"
                  onChange={handleDescriptionChange}
                />
                Cena
              </label>
              <textarea
                value={customDescription}
                onChange={(e) => setCustomDescription(e.target.value)}
                placeholder="Enter your custom comment"
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="grade">Grade:</label>
            <input
              type="number"
              id="grade"
              min="1"
              max="5"
              value={grade}
              onChange={(e) => setGrade(Number(e.target.value))}
            />
          </div>
          <button type="submit">Submit</button>
          <button type="button" onClick={onClose}>Close</button>
          {successMessage && <p className="success-message">{successMessage}</p>}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
};

export default GradeCompany;