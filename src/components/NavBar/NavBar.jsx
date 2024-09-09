import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NavBar.css'; 

const NavBar = ({ userRole, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-left">
          <h1>MEDcom</h1>
        </div>
        <div className="navbar-right">
          <Link to="/" className="nav-link">Home</Link>
          {userRole === 'Guest' && (
            <>
              <Link to="/user/register" className="nav-link">Sign Up</Link>
              <Link to="/login" className="nav-link">Sign In</Link>
            </>
          )}
          {userRole === 'Admin' && (
            <>
              <Link to="/register-company" className="nav-link">Register Company</Link>
              <Link to="/register-admin" className="nav-link">Register Admin</Link>
              <Link to="/lp" className="nav-link">Loyalty Program</Link>
            </>
          )}

          {userRole === 'User' && (
            <>
              <Link to="/user/reservations" className="nav-link">Reservations</Link>
              <Link to="/user/grades" className="nav-link">Grades</Link>
            </>
          )}

          {userRole === 'CompanyAdmin' && (
            <>
              <Link to="/reports/review" className="nav-link">Reports</Link>
              <Link to="/statistic" className="nav-link">Statistic</Link>
            </>
          )}
          {userRole !== 'Guest' && (
            <button onClick={handleLogout} className="nav-link logout-button">Log Out</button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;