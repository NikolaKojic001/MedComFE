import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserHome.css';

const UserHome = () => {
  const [loyaltyProgram, setLoyaltyProgram] = useState(null);
  const [error, setError] = useState('');
  const [userID, setUserID] = useState(null);
  console.log(userID, loyaltyProgram,error)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No token found');

        console.log("Fetching user data...");

        const response = await axios.get('/users/get/data', {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        const fetchedUserID = response.data.ID;
        console.log("User ID fetched:", fetchedUserID);
        setUserID(fetchedUserID); 

        fetchLoyaltyProgram(fetchedUserID);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Failed to fetch user data');
      }
    };

    const fetchLoyaltyProgram = async (userID) => {
      try {
        console.log(`Fetching loyalty program for userID: ${userID}...`);

        const response = await axios.get(`/users/set/loyalty/program/${userID}`);

        console.log("Loyalty program data:", response.data); 
        setLoyaltyProgram(response.data);
      } catch (error) {
        console.error('Error fetching loyalty program:', error);
        setError('Failed to load loyalty program');
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="userhome-container">
      <h1>Welcome to Your Home Page</h1>
    </div>
  );
};

export default UserHome;