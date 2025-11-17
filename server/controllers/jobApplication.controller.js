// Updated import path and model name
import JobApplication from '../models/jobApplication.model.js'; 
import errorHandler from './error.controller.js';

/**
 * Creates a new job application record.
 */
const create = async (req, res) => {
    const jobApplication = new JobApplication({ // Uses the new model name
        ...req.body,
        owner: req.auth._id 
    }); 

    try {
        let result = await jobApplication.save();
        res.status(201).json(result);
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
};

/**
 * Lists all job applications belonging to the authenticated user.
 */
const list = async (req, res) => {
    try {
        let jobApplications = await JobApplication.find({ owner: req.auth._id }) // Uses the new model name
            .select('-__v -owner') 
            .sort({ appliedDate: -1 }); 
        
        res.json(jobApplications);
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
};

export default { 
    create,
    list
};