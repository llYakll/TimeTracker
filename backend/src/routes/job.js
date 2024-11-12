import express from 'express';
import { createJob, getAllJobs, getJobById, updateJob, deleteJobById } from '../controllers/jobController.js';

const jobRouter = express.Router(); // Explicitly named router so if used elsewhere it is clear what it is.

//if z request is made to y endpoint it will execute x function.
jobRouter.post('/', createJob); // Create a new job
jobRouter.get('/', getAllJobs); // Get all jobs
jobRouter.get('/:id', getJobById); // Get a specific job by ID
jobRouter.put('/:id', updateJob); // Update a specific job
jobRouter.delete('/:id', deleteJobById); // Delete a specific job

export default jobRouter; 
