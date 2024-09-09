import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ReservationsView.css';

const ReservationsView = () => {
  const [user, setUser] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [canceledReservations, setCanceledReservations] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/users/get/data', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const fetchReservations = async () => {
      if (user) {
        try {
          const response = await axios.get(`/reservations/get/all/for/${user.ID}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });
          setReservations(response.data);
        } catch (error) {
          console.error("Error fetching reservations:", error);
        }
      }
    };

    const fetchCanceledReservations = async () => {
      try {
        const response = await axios.get('/reservations/get/all/canceled', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setCanceledReservations(response.data);
      } catch (error) {
        console.error("Error fetching canceled reservations:", error);
      }
    };

    fetchUserData();
    fetchReservations();
    fetchCanceledReservations();
  }, [user]);

  const handleCancel = async (reservationID) => {
    try {
      await axios.post(`/reservations/cancel/${reservationID}`, null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setReservations((prev) => prev.filter((res) => res.ID !== reservationID));
    } catch (error) {
      console.error("Error canceling reservation:", error);
    }
  };

  const handleBook = async (reservationID) => {
    try {
      await axios.post(`/reservations/take/${reservationID}`, null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setCanceledReservations((prev) => prev.filter((res) => res.ID !== reservationID));
    } catch (error) {
      console.error("Error booking reservation:", error);
    }
  };

  return (
    <div className="reservations-view-container">
      <h1>Your Reservations</h1>
      <div className="reservations-grid">
        {reservations.map((reservation) => (
          <div className="reservation-card" key={reservation.ID}>
            <h3>Reservation ID: {reservation.ID}</h3>
            <p>Start Date: {new Date(reservation.StartDate).toLocaleDateString()}</p>
            <p>End Date: {new Date(reservation.EndDate).toLocaleDateString()}</p>
            <button onClick={() => handleCancel(reservation.ID)}>Cancel Reservation</button>
          </div>
        ))}
      </div>

      <h1>Canceled Reservations Available for Booking</h1>
      <div className="reservations-grid">
        {canceledReservations.map((reservation) => (
          <div className="reservation-card" key={reservation.ID}>
            <h3>Reservation ID: {reservation.ID}</h3>
            <p>Start Date: {new Date(reservation.StartDate).toLocaleDateString()}</p>
            <p>End Date: {new Date(reservation.EndDate).toLocaleDateString()}</p>
            <button onClick={() => handleBook(reservation.ID)}>Book Reservation</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReservationsView;