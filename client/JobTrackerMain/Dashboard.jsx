// src/components/DashboardSummary.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ApplicationTable from './JobApplication/ApplicationTable'; // Imported new component
import SummaryCards from './SummaryCards';     // Imported new component
import '../src/src-CSS/general.css'; 
import auth from '../lib/auth-helper';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirects

// API function to fetch the list of job applications for the logged-in user
const listJobs = async () => {
  const jwt = auth.isAuthenticated(); // Use auth helper to get JWT

  // Check if the user is authenticated before attempting fetch
  if (!jwt) {
    return { error: 'Authentication token missing', jobs: [] };
  }

  try {
    const response = await fetch('/api/jobs', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + jwt.token, // Use jwt.token
      }
    });
    
    if (!response.ok) {
        const errorData = await response.json();
        // Handle common unauthorized/forbidden errors (401/403)
        if (response.status === 401 || response.status === 403) {
            // Throw a specific error to handle token cleanup in the component
            throw new Error(`Authentication error! status: ${response.status}`);
        }
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    return await response.json();

  } catch (error) {
    console.error('Failed to fetch job list:', error);
    return { error: error.message || 'Could not load jobs', jobs: [] };
  }
};


export default function DashboardSummary() {
    const navigate = useNavigate();
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchJobs = async () => {
            setLoading(true);
            const data = await listJobs();

            if (data.error) {
                // If the error indicates authentication failure, clear token and redirect
                if (data.error.includes('401') || data.error.includes('403') || data.error.includes('token missing')) {
                    auth.clearJWT(() => navigate('/signin'));
                    setError('Session expired. Please sign in again.');
                } else {
                    setError(data.error);
                }
                setJobs([]);
            } else {
                setJobs(data);
            }
            setLoading(false);
        };

        fetchJobs();
    }, [navigate]); 

    // --- Calculate Summary Data ---
    const total = jobs.length;
    
    // 🔑 REVISED LOGIC: Active Tracking should be all jobs that are NOT a final outcome (Offer or Rejected).
    const activeTracking = jobs.filter(job => 
        job.status !== 'Offer' && 
        job.status !== 'Rejected'
    ).length;
    
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
                pending={activeTracking} // Passing the corrected activeTracking count
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