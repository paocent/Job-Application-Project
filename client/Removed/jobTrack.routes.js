import express from 'express';
import jobCtrl from '../controllers/jobTrack.controller.js/index.js';
import authCtrl from '../../server/controllers/auth.controller.js';

const router = express.Router();

// ----------------------------------------------------
// Base Routes: /api/jobs (List and Create)
// ----------------------------------------------------
router.route('/api/jobs')
    // GET: List all job applications for the signed-in user (Dashboard List)
    .get(authCtrl.requireSignin, jobCtrl.listByUser) 
    
    // POST: Create a new job application
    .post(authCtrl.requireSignin, jobCtrl.create);

// ----------------------------------------------------
// Parameterized Routes: /api/jobs/:jobId (Read, Update, Delete)
// ----------------------------------------------------
router.route('/api/jobs/:jobId')
    // GET: Read a specific job application
    .get(authCtrl.requireSignin, jobCtrl.read)
    
    // PUT: Update a specific job application
    .put(authCtrl.requireSignin, jobCtrl.update) 
    
    // DELETE: Delete a specific job application
    .delete(authCtrl.requireSignin, jobCtrl.remove);

// --- Define router.param ONLY ONCE ---
// This middleware must use 'jobId' as defined in the parameterized routes above.
router.param('jobId', jobCtrl.jobByID); 

export default router;