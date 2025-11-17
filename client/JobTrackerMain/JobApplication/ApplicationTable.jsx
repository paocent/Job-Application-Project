import React from 'react';

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
              {/* Add a column for viewing/editing details */}
              <th>Actions</th> 
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job._id}>
                <td>{job.company}</td>
                <td>{job.role}</td>
                <td>{job.status}</td>
                <td>{new Date(job.appliedDate).toLocaleDateString()}</td>
                {/* COMMENT: Link to a detail page for update/remove */}
                <td><button>View/Edit</button></td> 
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