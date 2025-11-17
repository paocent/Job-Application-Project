import mongoose from 'mongoose';

const JobApplicationSchema = new mongoose.Schema({
    company: {
        type: String,
        trim: true,
        required: 'Company name is required'
    },
    role: {
        type: String,
        trim: true,
        required: 'Job role is required'
    },
    status: {
        type: String,
        enum: ['Applied', 'Pending', 'Interviewing', 'Offer', 'Rejected'],
        default: 'Applied'
    },
    appliedDate: {
        type: Date,
        default: Date.now
    },
    link: {
        type: String,
        trim: true,
        default: ''
    },
    notes: {
        type: String,
        default: ''
    },
    // Links the job application to a specific user (the owner)
    owner: {
        type: mongoose.Schema.ObjectId,
        ref: 'User', // Assuming your user model is still named 'User'
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

// Export the model using the distinct name 'JobApplication'
export default mongoose.model('JobApplication', JobApplicationSchema);