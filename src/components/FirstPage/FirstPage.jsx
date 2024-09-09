import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './FirstPage.css';

const FirstPage = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get('/companies/get/all');
        setCompanies(response.data);
      } catch (error) {
        console.error("Error while fetching companies:", error);
      }
    };

    fetchCompanies();
  }, []);

  return (
    <div className="companies-grid">
      {companies.map((company) => (
        <Link to={`/company?companyID=${company.ID}`} key={company.ID} className="company-link">
          <div className="company-card">
            <h3>{company.Name}</h3>
            {company.Location && company.Location.City && company.Location.Country ? (
              <p>
                {company.Location.City}, {company.Location.Country}
              </p>
            ) : (
              <p>Location not available</p>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default FirstPage;
