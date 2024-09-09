import React, { useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, ResponsiveContainer } from 'recharts';
import './Statistic.css';

const Statistic = () => {
  const [averageGrade] = useState(null);

  const [reservationsByMonth, setReservationsByMonth] = useState([]);
  const [reservationsByMonthYear, setReservationsByMonthYear] = useState(2024);

  const [reservationsByQuartals, setReservationsByQuartals] = useState([]);
  const [reservationsByQuartalYear, setReservationsByQuartalYear] = useState(2024);

  const [reservationsByYears, setReservationsByYears] = useState([]);
  const [reservationsStartYear, setReservationsStartYear] = useState(2023);
  const [reservationsEndYear, setReservationsEndYear] = useState(2024);

  const [appointmentsByMonth, setAppointmentsByMonth] = useState([]);
  const [appointmentsByMonthYear, setAppointmentsByMonthYear] = useState(2024); 

  const [appointmentsByQuartals, setAppointmentsByQuartals] = useState([]);
  const [appointmentsByQuartalYear, setAppointmentsByQuartalYear] = useState(2024); 

  const [appointmentsByYears, setAppointmentsByYears] = useState([]);
  const [appointmentsStartYear, setAppointmentsStartYear] = useState(2023); 
  const [appointmentsEndYear, setAppointmentsEndYear] = useState(2024);

  const [errorMessage, setErrorMessage] = useState('');
  const token = localStorage.getItem('token');

  const fetchReservationsByMonth = async () => {
    try {
      const response = await axios.get(`/statistics/get/reservations/by/month/${reservationsByMonthYear}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setReservationsByMonth(convertToChartData(response.data));
    } catch (error) {
      setErrorMessage('Failed to load reservations by month');
    }
  };

  const fetchReservationsByQuartals = async () => {
    try {
      const response = await axios.get(`/statistics/get/reservations/by/queartals/${reservationsByQuartalYear}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setReservationsByQuartals(convertToChartData(response.data));
    } catch (error) {
      setErrorMessage('Failed to load reservations by quartals');
    }
  };

  const fetchReservationsByYears = async () => {
    try {
      const response = await axios.get(`/statistics/get/reservations/by/years/${reservationsStartYear}/${reservationsEndYear}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setReservationsByYears(convertToChartData(response.data));
    } catch (error) {
      setErrorMessage('Failed to load reservations by years');
    }
  };

  const fetchAppointmentsByMonth = async () => {
    try {
      const response = await axios.get(`/statistics/get/appointments/by/month/${appointmentsByMonthYear}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setAppointmentsByMonth(convertToChartData(response.data));
    } catch (error) {
      setErrorMessage('Failed to load appointments by month');
    }
  };

  const fetchAppointmentsByQuartals = async () => {
    try {
      const response = await axios.get(`/statistics/get/appointments/by/queartals/${appointmentsByQuartalYear}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setAppointmentsByQuartals(convertToChartData(response.data));
    } catch (error) {
      setErrorMessage('Failed to load appointments by quartals');
    }
  };

  const fetchAppointmentsByYears = async () => {
    try {
      const response = await axios.get(`/statistics/get/appointments/by/years/${appointmentsStartYear}/${appointmentsEndYear}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setAppointmentsByYears(convertToChartData(response.data));
    } catch (error) {
      setErrorMessage('Failed to load appointments by years');
    }
  };

  const convertToChartData = (data) => {
    return Object.keys(data).map(key => ({
      name: key,
      value: data[key],
    }));
  };

  return (
    <div className="statistics-page">
      <div className="header">
        <h1 className='MainHeder'>Company Statistics</h1>
        {averageGrade !== null && (
          <div className="average-grade">Average Grade: {averageGrade}</div>
        )}
      </div>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <div className="charts-container">
        <div className="input-form">
          <label>Year for Reservations by Month:</label>
          <input
            type="number"
            value={reservationsByMonthYear}
            onChange={(e) => setReservationsByMonthYear(e.target.value)}
          />
          <button onClick={fetchReservationsByMonth}>Fetch Data</button>
        </div>
        <div className="chart">
          <h3>Reservations by Month</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={reservationsByMonth}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="input-form">
          <label>Year for Reservations by Quartals:</label>
          <input
            type="number"
            value={reservationsByQuartalYear}
            onChange={(e) => setReservationsByQuartalYear(e.target.value)}
          />
          <button onClick={fetchReservationsByQuartals}>Fetch Data</button>
        </div>
        <div className="chart">
          <h3>Reservations by Quartals</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={reservationsByQuartals}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="input-form">
          <label>Start Year for Reservations by Years:</label>
          <input
            type="number"
            value={reservationsStartYear}
            onChange={(e) => setReservationsStartYear(e.target.value)}
          />
          <label>End Year for Reservations by Years:</label>
          <input
            type="number"
            value={reservationsEndYear}
            onChange={(e) => setReservationsEndYear(e.target.value)}
          />
          <button onClick={fetchReservationsByYears}>Fetch Data</button>
        </div>
        <div className="chart">
          <h3>Reservations by Years</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={reservationsByYears}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>


        <div className="input-form">
          <label>Year for Appointments by Month:</label>
          <input
            type="number"
            value={appointmentsByMonthYear}
            onChange={(e) => setAppointmentsByMonthYear(e.target.value)}
          />
          <button onClick={fetchAppointmentsByMonth}>Fetch Data</button>
        </div>
        <div className="chart">
          <h3>Appointments by Month</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={appointmentsByMonth}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="input-form">
          <label>Year for Appointments by Quartals:</label>
          <input
            type="number"
            value={appointmentsByQuartalYear}
            onChange={(e) => setAppointmentsByQuartalYear(e.target.value)}
          />
          <button onClick={fetchAppointmentsByQuartals}>Fetch Data</button>
        </div>
        <div className="chart">
          <h3>Appointments by Quartals</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={appointmentsByQuartals}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="input-form">
          <label>Start Year for Appointments by Years:</label>
          <input
            type="number"
            value={appointmentsStartYear}
            onChange={(e) => setAppointmentsStartYear(e.target.value)}
          />
          <label>End Year for Appointments by Years:</label>
          <input
            type="number"
            value={appointmentsEndYear}
            onChange={(e) => setAppointmentsEndYear(e.target.value)}
          />
          <button onClick={fetchAppointmentsByYears}>Fetch Data</button>
        </div>
        <div className="chart">
          <h3>Appointments by Years</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={appointmentsByYears}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Statistic;