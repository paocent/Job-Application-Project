import Job from '../models/jobTrack.model.js';
import extend from 'lodash/extend.js';
import errorHandler from '../../server/controllers/error.controller.js';

/**
 * Middleware to fetch a single job by ID and attach it to the request object.
 */
const jobByID = async (req, res, next, id) => {
    try {
        // Find the job and also populate the userId (optional, but good practice)
        let job = await Job.findById(id).populate('userId', '_id name'); 
        if (!job) {
            return res.status(404).json({
                error: "Job application not found"
            });
        }
        req.job = job;
        next();
    } catch (err) {
        return res.status(400).json({
            error: "Could not retrieve job application: " + err.message
        });
    }
};

/**
 * Creates a new job application.
 * Requires user to be signed in (via middleware).
 */
const create = async (req, res) => {
    // 🔑 Assign the ID of the signed-in user to the job document
    const job = new Job(req.body);
    job.userId = req.auth._id; // Assuming req.auth._id holds the authenticated user's ID
    
    try {
        await job.save();
        return res.status(201).json({
            message: "Successfully tracked new job application!",
            job: job // Return the created job object
        });
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
};

/**
 * Lists all job applications for the logged-in user (Dashboard view).
 * Requires user to be signed in.
 */
const listByUser = async (req, res) => {
    try {
        // 🔑 Find ONLY jobs where the userId matches the signed-in user's ID
        let jobs = await Job.find({ userId: req.auth._id })
                             .sort({ appliedDate: -1 }); // Show newest first
        
        res.json(jobs);
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
};

/**
 * Reads a single job application.
 * The job is already attached to req.job by the jobByID middleware.
 */
const read = (req, res) => {
    // Check if the job belongs to the user (security check)
    if (req.job.userId.toString() !== req.auth._id.toString()) {
        return res.status(403).json({
            error: "User is not authorized to read this job application"
        });
    }
    return res.json(req.job);
};

/**
 * Updates a job application (e.g., status, notes).
 * Requires user to be signed in AND authorized (ownership).
 */
const update = async (req, res) => {
    try {
        let job = req.job;
        
        // Authorization check (must own the job to update it)
        if (job.userId.toString() !== req.auth._id.toString()) {
            return res.status(403).json({
                error: "User is not authorized to update this job application"
            });
        }
        
        job = extend(job, req.body);
        job.updated = Date.now();
        await job.save();
        
        res.json(job);
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
};

/**
 * Deletes a job application.
 * Requires user to be signed in AND authorized (ownership).
 */
const remove = async (req, res) => {
    try {
        let job = req.job;
        
        // Authorization check (must own the job to delete it)
        if (job.userId.toString() !== req.auth._id.toString()) {
            return res.status(403).json({
                error: "User is not authorized to delete this job application"
            });
        }
        
        let deletedJob = await job.deleteOne();
        res.json({
            message: "Job application successfully removed",
            job: deletedJob
        });
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
};

export default { 
    create, 
    jobByID, // The parameter function
    read, 
    listByUser, 
    remove, 
    update
};