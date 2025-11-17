import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ApplicationTable from './JobApplication/ApplicationTable'; // Imported new component
import SummaryCards from './SummaryCards';     // Imported new component
import '../src/src-CSS/general.css'; 

// Placeholder API function (defined in previous step)
const listJobs = async () => {
  const jwt = localStorage.getItem('jwt');

  try {
    const response = await fetch('/api/jobs', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + jwt,
      }
    });
    
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();

  } catch (error) {
    console.error('Failed to fetch job list:', error);
    return { error: 'Could not load jobs', jobs: [] };
  }
};


export default function DashboardSummary() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      const data = await listJobs();

      if (data.error) {
        setError(data.error);
        setJobs([]);
      } else {
        setJobs(data);
      }
      setLoading(false);
    };

    fetchJobs();
  }, []); 

  // --- Calculate Summary Data ---
  const total = jobs.length;
  // Count applications that are actively being considered
  const pending = jobs.filter(job => job.status === 'Applied' || job.status === 'Pending').length; 
  const interviewing = jobs.filter(job => job.status === 'Interviewing').length;
  const offers = jobs.filter(job => job.status === 'Offer').length;
  // ------------------------------

  if (loading) {
    return <div className="content-container"><p>Loading your job tracker data...</p></div>;
  }

  if (error) {
    return <div className="content-container"><p style={{ color: 'red' }}>Error: {error}</p></div>;
  }


  return (
    <div className="dashboard-container">
      <h1 className='header'>📊 Application Dashboard</h1>
      <p>Welcome! Here's a quick look at your job search progress.</p>
      
      <hr />
      
      {/* RENDERED SEPARATE COMPONENT */}
      <SummaryCards 
        total={total} 
        pending={pending} 
        interviewing={interviewing} 
        offers={offers} 
      />

      <hr />

      <div className="quick-actions">
        <h3>Quick Action</h3>
        <Link to="/add-job" className="add-job-button">
          + Add New Application
        </Link>
      </div>

      <hr />

      {/* RENDERED SEPARATE COMPONENT */}
      <ApplicationTable jobs={jobs} />

    </div>
  );
}