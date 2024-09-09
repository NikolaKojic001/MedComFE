import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Report.css'; // Assuming you have a CSS file for styling

const Report = () => {
  const [reports, setReports] = useState([]); // Initialize as an empty array
  const [replyText, setReplyText] = useState('');
  const [selectedReportID, setSelectedReportID] = useState(null);
  const [error, setError] = useState('');
  const [companyID, setCompanyID] = useState(null);
  console.log(companyID)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No token found');

        const response = await axios.get('/users/get/data', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        console.log(response.data);

        const userCompanyID = response.data.CompmnayID; 
        console.log('Company ID:', userCompanyID); 
        setCompanyID(userCompanyID);  
        fetchReports(userCompanyID);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Failed to fetch user data');
      }
    };

    const fetchReports = async (companyID) => {
      try {
        console.log('Fetching reports with Company ID:', companyID); // Log companyID used for fetching reports
        const response = await axios.get(`/companies/get/all/reports?companyID=${companyID}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        console.log('Reports response:', response.data); // Log reports data
        setReports(response.data);
      } catch (error) {
        console.error('Error fetching reports:', error);
        setError('Failed to fetch reports');
      }
    };

    fetchUserData();
  }, []);

  const handleReplyClick = async (reportID) => {
    if (!replyText.trim()) {
      setError('Reply cannot be empty');
      return;
    }

    try {
      console.log('Sending reply for report ID:', reportID); // Log reportID being replied to
      const response = await axios.put(`/companies/report/replay/${reportID}`, {
        description: replyText // Adjusted to use 'description' key as per API
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log('Reply response:', response.data); // Log reply response
      setReports(reports.map(report => 
        report.ID === reportID ? { ...report, Replay: replyText } : report
      ));
      setReplyText('');
      setSelectedReportID(null);
    } catch (error) {
      console.error('Error sending reply:', error);
      setError('Failed to send reply');
    }
  };

  return (
    <div className="report-container">
      <h1>Reports</h1>
      {error && <p className="error-message">{error}</p>}
      <div className="report-list">
        {Array.isArray(reports) && reports.length > 0 ? (
          reports.map((report) => (
            <div className="report-item" key={report.ID}>
              <p><strong>Description:</strong> {report.Description}</p>
              <p><strong>Reply:</strong> {report.Replay || 'No reply yet'}</p>
              <button onClick={() => {
                setSelectedReportID(report.ID);
                setReplyText('');
              }}>
                Reply
              </button>
              {selectedReportID === report.ID && (
                <div className="reply-form">
                  <textarea 
                    value={replyText} 
                    onChange={(e) => setReplyText(e.target.value)} 
                    placeholder="Write your reply here..."
                  />
                  <button onClick={() => handleReplyClick(report.ID)}>Submit Reply</button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No reports available</p>
        )}
      </div>
    </div>
  );
};

export default Report;