import React from 'react';
// 🔑 Import the Link component for smooth navigation
import { Link } from 'react-router-dom'; 

export default function ApplicationTable({ jobs }) {
  return (
    <div className="job-list-table">
      <h2>Your Applications ({jobs.length})</h2>
      {jobs.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Company</th>
              <th>Role</th>
              <th>Status</th>
              <th>Date Applied</th>
              <th>Actions</th> 
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job._id}>
                <td>{job.company}</td>
                <td>{job.role}</td>
                <td>
                  {/* Optional: Add a style or class based on status for visual feedback */}
                  <span className={`status-${job.status.toLowerCase()}`}>
                    {job.status}
                  </span>
                </td>
                <td>{new Date(job.appliedDate).toLocaleDateString()}</td>
                <td>
                  {/* 🔑 Use the Link component with the dynamic job ID parameter */}
                  <Link 
                    to={`/job/${job._id}`} 
                    className="button-link" // Add a class for styling like a button
                  >
                    View / Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>You haven't added any job applications yet. Click "Add New Application" to start tracking!</p>
      )}
    </div>
  );
}