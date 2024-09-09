import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './CompanyDetails.css';
import GradeCompany from '../GradeCompany/GradeCompany';

const CompanyDetails = () => {
  const [company, setCompany] = useState(null);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [showReservationForm, setShowReservationForm] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [days, setDays] = useState('');
  const [availableDates, setAvailableDates] = useState([]);
  const [reservationSuccess, setReservationSuccess] = useState('');
  const [reservationError, setReservationError] = useState('');
  const [userRole, setUserRole] = useState(null);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showGradeModal, setShowGradeModal] = useState(false);
  const [reportDescription, setReportDescription] = useState('');
  const [reportError, setReportError] = useState('');
  const [reportSuccess, setReportSuccess] = useState('');

  const query = new URLSearchParams(useLocation().search);
  const companyID = query.get('companyID');

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axios.get('/users/role', { headers: { 'Authorization': `Bearer ${token}` } });
          setUserRole(response.data);
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    };

    fetchUserRole();
  }, []);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const response = await axios.get(`/companies/get/by/id?companyID=${companyID}`);
        setCompany(response.data);
      } catch (error) {
        console.error("Error while fetching company details:", error);
      }
    };

    fetchCompany();
  }, [companyID]);

  const handleAssetClick = (asset) => {
    if (userRole !== 'User') {
      return;
    }

    setSelectedAsset(asset);
    setShowReservationForm(true);
  };

  const checkAvailability = async () => {
    if (!startDate || !endDate || !days || !selectedAsset) {
      console.error("Please fill out all fields.");
      return;
    }

    console.log('Checking availability with:', {
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      days: parseInt(days),
      assetID: selectedAsset.ID
    });

    try {
      const requestBody = {
        assets: [selectedAsset.ID],
        days: parseInt(days),
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString()
      };

      const response = await axios.post('/reservations/request', requestBody, {
        headers: { 'CompanyID': companyID }
      });
      console.log('Available dates response:', response.data);
      setAvailableDates(response.data);
    } catch (error) {
      console.error("Error while fetching available dates:", error);
    }
  };

  const handleReservationSubmit = async (e) => {
    e.preventDefault();
    setReservationSuccess('');
    setReservationError('');

    let userID = null;
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const userResponse = await axios.get('/users/get/data', { headers: { 'Authorization': `Bearer ${token}` } });
        userID = userResponse.data.ID;
      } else {
        throw new Error("No token found");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setReservationError('Failed to fetch user data');
      return;
    }

    const requestBody = {
      assets: [selectedAsset.ID],
      days: parseInt(days),
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      userID: userID
    };

    try {
      const response = await axios.post('/reservations/create', requestBody, {
        headers: { 'CompanyID': companyID }
      });
      console.log(response);
      setReservationSuccess('Reservation successfully created');
    } catch (error) {
      setReservationError('Failed to create reservation');
    }
  };

  const handleReportSubmit = async () => {
    setReportSuccess('');
    setReportError('');

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error("No token found");
      }

      const response = await axios.post(
        '/companies/report',
        { description: reportDescription },
        { headers: { 'Authorization': `Bearer ${token}`, 'CompanyID': companyID } }
      );
      console.log(response);
      setReportSuccess('Report successfully submitted');
      setShowReportModal(false);
      setReportDescription('');
    } catch (error) {
      console.error("Error while submitting report:", error);
      setReportError('Failed to submit report');
    }
  };

  if (!company) {
    return <div>Loading...</div>;
  }

  return (
    <div className="company-details">
      <h1>{company.Name}</h1>
      {userRole === 'User' && (
        <div>
          <button className="report-button" onClick={() => setShowReportModal(true)}>Report</button>
          <button className="grade-button" onClick={() => setShowGradeModal(true)}>Grade</button>
        </div>
      )}

      {showReportModal && (
        <div className="report-modal">
          <div className="modal-content">
            <h2>Report Company</h2>
            <textarea
              value={reportDescription}
              onChange={(e) => setReportDescription(e.target.value)}
              placeholder="Enter description"
            />
            <button onClick={handleReportSubmit}>Submit</button>
            <button onClick={() => setShowReportModal(false)}>Close</button>
            {reportSuccess && <p className="success-message">{reportSuccess}</p>}
            {reportError && <p className="error-message">{reportError}</p>}
          </div>
        </div>
      )}

      {showGradeModal && (
        <GradeCompany
          companyID={companyID}
          token={localStorage.getItem('token')}
          onClose={() => setShowGradeModal(false)}
        />
      )}

      <div className="assets-grid">
        {company.Assets.length > 0 ? (
          company.Assets.map((asset) => (
            <div className="asset-card" key={asset.ID} onClick={() => handleAssetClick(asset)}>
              <h3>{asset.Name}</h3>
            </div>
          ))
        ) : (
          <p>No assets available</p>
        )}
      </div>

      {userRole === 'User' && showReservationForm && (
        <div className="reservation-form">
          <h2>Reserve {selectedAsset.Name}</h2>
          <form onSubmit={handleReservationSubmit}>
            <div className="form-group">
              <label htmlFor="startDate">Start Date:</label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                dateFormat="yyyy/MM/dd"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="endDate">End Date:</label>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                dateFormat="yyyy/MM/dd"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="days">Number of Days:</label>
              <input
                type="number"
                id="days"
                value={days}
                onChange={(e) => setDays(e.target.value)}
                placeholder="Enter number of days"
                required
              />
            </div>
            <button type="button" onClick={checkAvailability}>Check Availability</button>
            <button type="submit">Submit Reservation</button>
          </form>

          {availableDates.length > 0 && (
            <div className="available-dates">
              <h3>Select an Available Date Range:</h3>
              <ul>
                {availableDates.map((dateRange, index) => (
                  <li key={index}>
                    <button
                      onClick={() => {
                        setStartDate(new Date(dateRange.startDate));
                        setEndDate(new Date(dateRange.endDate));
                      }}
                    >
                      {new Date(dateRange.startDate).toDateString()} to {new Date(dateRange.endDate).toDateString()}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {reservationSuccess && <p className="success-message">{reservationSuccess}</p>}
          {reservationError && <p className="error-message">{reservationError}</p>}
        </div>
      )}
    </div>
  );
};

export default CompanyDetails;