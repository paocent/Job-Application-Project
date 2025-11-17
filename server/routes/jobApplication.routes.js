import express from 'express';
// Updated import name
import jobApplicationCtrl from '../controllers/jobApplication.controller.js'; 
import authCtrl from '../controllers/auth.controller.js'; 

const router = express.Router();

// The API path remains the same: /api/jobs
router.route('/api/jobs')
    .get(authCtrl.requireSignin, jobApplicationCtrl.list) 
    .post(authCtrl.requireSignin, jobApplicationCtrl.create); 

export default router;