import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PastGrades.css';

const PastGrades = () => {
  const [grades, setGrades] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [newGrade, setNewGrade] = useState(1);
  const [newDescription, setNewDescription] = useState([]);

  useEffect(() => {
    const fetchGrades = async () => {
      const token = localStorage.getItem('token'); 
      if (!token) {
        setErrorMessage('Token not found');
        return;
      }

      try {
        console.log("Fetching grades with token:", token); 
        const response = await axios.get('/companies/get/all/grades', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        console.log("Grades fetched successfully:", response.data); 
        setGrades(response.data);
      } catch (error) {
        console.error("Error fetching grades:", error.response || error); 
        setErrorMessage('Failed to fetch grades');
      }
    };

    fetchGrades();
  }, []);

  const handleUpdate = async () => {
    if (!selectedGrade) return;
    const token = localStorage.getItem('token'); 
    if (!token) {
      setErrorMessage('Token not found');
      return;
    }

    try {
      const response = await axios.put(`/companies/grade/update/${selectedGrade.ID}`, {
        grade: newGrade,
        description: newDescription
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      console.log("Grade updated successfully:", response.data);
      setGrades(grades.map(grade => 
        grade.ID === selectedGrade.ID ? { ...grade, Grade: newGrade, Description: newDescription } : grade
      ));
      setSelectedGrade(null);
      setNewGrade(1);
      setNewDescription([]);
    } catch (error) {
      console.error("Error updating grade:", error.response || error);
      setErrorMessage('Failed to update grade');
    }
  };

  const handleSelectGrade = (grade) => {
    setSelectedGrade(grade);
    setNewGrade(grade.Grade);
    setNewDescription(grade.Description);
  };

  return (
    <div className="past-grades">
      <div className="past-grades-header">
        <h1>Past Grades</h1>
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div className="grades-list">
        {grades.map((grade) => (
          <div key={grade.ID} className="grade-card">
            <h3>Grade: {grade.Grade}</h3>
            <p>Description: {grade.Description.join(', ')}</p>
            <button onClick={() => handleSelectGrade(grade)}>Edit</button>
          </div>
        ))}
      </div>
      {selectedGrade && (
        <div className="update-form">
          <h2>Edit Grade</h2>
          <label>
            Grade:
            <input 
              type="number" 
              value={newGrade} 
              onChange={(e) => setNewGrade(parseInt(e.target.value, 10))} 
            />
          </label>
          <label>
            Description:
            <input 
              type="text" 
              value={newDescription.join(', ')} 
              onChange={(e) => setNewDescription(e.target.value.split(',').map(desc => desc.trim()))} 
            />
          </label>
          <button onClick={handleUpdate}>Update Grade</button>
          <button onClick={() => setSelectedGrade(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default PastGrades;