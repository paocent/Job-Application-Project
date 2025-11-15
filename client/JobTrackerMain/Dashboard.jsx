import React from 'react';
// Assuming a CSS file for styling the dashboard
import './css/Dashboard.css';
import { Link } from 'react-router-dom';

export default function DashboardSummary() {
  // Placeholder data - in a real app, this would come from your MongoDB backend
  const summaryData = [
    { label: "Total Applications", count: 25, className: "total" },
    { label: "Pending Review", count: 12, className: "pending" },
    { label: "Interviews Scheduled", count: 3, className: "interview" },
    { label: "Offers Received", count: 1, className: "offer" },
  ];

  return (
    <div className="dashboard-container">
      <h1 className='header'>📊 Application Dashboard</h1>
      <p className="welcome-message">
        Welcome! Here's a quick look at your job search progress.
      </p>

      <hr />
      
      {/* SECTION 1: Summary Cards */}
      <div className="summary-cards-container">
        {summaryData.map((item) => (
          <div key={item.label} className={`summary-card ${item.className}`}>
            <h2>{item.count}</h2>
            <p>{item.label}</p>
          </div>
        ))}
      </div>

      <hr />

      {/* SECTION 2: Quick Action Button */}
      <div className="quick-actions">
        <h3>Quick Action</h3>
        <Link to="/add-job" className="add-job-button">
          + Add New Application
        </Link>
      </div>

      <hr />

      {/* SECTION 3: Main Job List/Table placeholder */}
      <h2>Recent Applications</h2>
      <div className="job-list-placeholder">
        {/* COMMENT: This is where the main list/table component 
          (e.g., <ApplicationTable jobs={jobsData} />) would go. 
        */}
        <p>
          *A list of your most recent applications will appear here.*
          <br/>
          (Example: Role, Company, Status, Date Applied)
        </p>
      </div>
    </div>
  );
}