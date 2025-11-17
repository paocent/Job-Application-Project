import mongoose from 'mongoose';

// Define the schema for a Job Application
const JobSchema = new mongoose.Schema({
    // 🔑 Link to the user who created this application (crucial for filtering/security)
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User', // Assuming you have a separate User model for authentication
        required: 'User ID is required'
    },
    
    // Core Job Information
    company: {
        type: String,
        trim: true,
        required: 'Company name is required'
    },
    role: { // Using 'role' instead of 'title' for clarity
        type: String,
        trim: true,
        required: 'Job role is required'
    },
    location: {
        type: String,
        trim: true,
        default: 'Remote'
    },
    
    // Tracking Information
    status: {
        type: String,
        enum: ['Pending', 'Applied', 'Interviewing', 'Offer', 'Rejected'], // Use specific status values
        default: 'Applied'
    },
    link: { // Link to the job posting
        type: String,
        trim: true
    },
    notes: { // Space for user to add interview notes, contacts, etc.
        type: String
    },
    
    // Date Information
    appliedDate: {
        type: Date,
        default: Date.now,
        required: 'Date applied is required'
    },
    updated: {
        type: Date,
        default: Date.now
    }
});

// Export the Mongoose Model
export default mongoose.model('Job', JobSchema);