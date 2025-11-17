// src/controllers/jobTrack.controller.js (Your provided code)

import Job from '../models/jobApplication.model.js';
import extend from 'lodash/extend.js';
import errorHandler from './error.controller.js';

/**
 * Middleware to fetch a single job by ID and attach it to the request object.
 */
const jobByID = async (req, res, next, id) => {
    try {
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

const create = async (req, res) => {
    const job = new Job(req.body);
    job.userId = req.auth._id;
    
    try {
        await job.save();
        return res.status(201).json({
            message: "Successfully tracked new job application!",
            job: job
        });
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
};

const listByUser = async (req, res) => {
    try {
        let jobs = await Job.find({ userId: req.auth._id })
                             .sort({ appliedDate: -1 });
        
        res.json(jobs);
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
};

const read = (req, res) => {
    // Authorization check
    if (req.job.userId.toString() !== req.auth._id.toString()) {
        return res.status(403).json({
            error: "User is not authorized to read this job application"
        });
    }
    return res.json(req.job);
};

const update = async (req, res) => {
    try {
        let job = req.job;
        
        // Authorization check
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

const remove = async (req, res) => {
    try {
        let job = req.job;
        
        // Authorization check
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
    jobByID,
    read, 
    listByUser, 
    remove, 
    update
};