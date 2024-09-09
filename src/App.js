import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import FirstPage from './components/FirstPage/FirstPage';
import UserHome from './components/UserHome/UserHome';
import UserRegister from './components/UserRegister/UserRegister';
import CompanyDetails from './components/CompanyDetails/CompanyDetails';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import CompanyAdminDashboard from './components/CompanyAdminDashboard/CompanyAdminDashboard';
import NavBar from './components/NavBar/NavBar';
import RegisterCompany from './components/RegisterCompany/RegisterCompany';
import RegisterAdmin from './components/RegisterAdmin/RegisterAdmin';
import ReservationsView from './components/ReservationsView/ReservationsView';
import Report from './components/Report/Report';
import LoyaltyProgram from './components/LoyaltyProgram/LoyaltyProgram';
import PastGrades from './components/PastGrades/PastGrades';
import Statistic from './components/Statistic/Statistic';
import UserReports from './components/UserReports/UserReports';
import { jwtDecode } from 'jwt-decode';

const App = () => {
  const [userRole, setUserRole] = useState('Guest');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserRole(decodedToken.role);
    } else {
      setUserRole('Guest');
    }
  }, []);

  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    const decodedToken = jwtDecode(token);
    setUserRole(decodedToken.role);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUserRole('Guest');
  };

  return (
    <Router>
      <NavBar userRole={userRole} onLogout={handleLogout} />
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/" element={<FirstPage />} />
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/user/dashboard" element={<UserHome />} />
        <Route path="/company" element={<CompanyDetails />} />
        {userRole === 'Admin' && (
          <>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/register-company" element={<RegisterCompany />} />
            <Route path="/register-admin" element={<RegisterAdmin />} />
            <Route path="/lp" element={<LoyaltyProgram />} />
          </>
        )}
        {userRole === 'CompanyAdmin' && (
          <>
            <Route path="/company-admin/dashboard" element={<CompanyAdminDashboard />} />
            <Route path="/reports/review" element={<Report />} />
            <Route path="/statistic" element={<Statistic />} />

          </>
        )}
        {userRole === 'User' && (
          <>
            <Route path="/user/reservations" element={<ReservationsView />} />
            <Route path="/user/grades" element={<PastGrades />} />
            <Route path="/user/reports" element={<UserReports />} />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default App;