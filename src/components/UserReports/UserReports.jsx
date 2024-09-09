import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserReports.css'; // Uverite se da dodate odgovarajući CSS

const UserReports = () => {
  const [reports, setReports] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  
  useEffect(() => {
    const fetchUserReports = async () => {
      const token = localStorage.getItem('token'); // Učitaj token iz local storage
      if (!token) {
        setErrorMessage('Token not found');
        return;
      }

      try {
        // Preuzmi korisničke podatke kako bismo dobili userID
        const userDataResponse = await axios.get('/users/get/data', {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        const userID = userDataResponse.data.ID;

        // Preuzmi sve izveštaje korisnika
        const reportsResponse = await axios.get('/users/get/all/reports', {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        // Filtriraj izveštaje prema korisničkom ID-u
        const userReports = reportsResponse.data.filter(report => report.UserID === userID);

        setReports(userReports);
      } catch (error) {
        console.error('Error fetching user reports:', error);
        setErrorMessage('Failed to load reports');
      }
    };

    fetchUserReports();
  }, []);

  return (
    <div className="user-reports">
      <h1>User Reports</h1>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div className="reports-list">
        {reports.length > 0 ? (
          reports.map((report) => (
            <div key={report.ID} className="report-card">
              <h3>Report ID: {report.ID}</h3>
              <p>Description: {report.Description}</p>
              {report.Replay ? (
                <p>Reply: {report.Replay}</p>
              ) : (
                <p className="no-reply">Not replayed</p>
              )}
            </div>
          ))
        ) : (
          <p>No reports found</p>
        )}
      </div>
    </div>
  );
};

export default UserReports;