import express from 'express';
import { 
    createJob,
    getAllJobs,
    getJobById,
    getJobsByStructureType,
    getJobsByJobType,
    getJobsByLocation,
    updateJobById,
    updateJobByLocation,
    deleteJobById
        } from '../controllers/job.js';

const jobRouter = express.Router(); // Explicitly named router so if used elsewhere it is clear what it is.

//if z request is made to y endpoint it will execute x function.
jobRouter.post('/jobs', createJob);
jobRouter.get('/jobs', getAllJobs);
jobRouter.get('/jobs/:id', getJobById);
jobRouter.get('/jobs/:structureType', getJobsByStructureType);
jobRouter.get('/jobs/:jobType', getJobsByJobType);
jobRouter.get('/jobs/:location', getJobsByLocation);
jobRouter.put('/jobs/:id', updateJobById);
jobRouter.put('/jobs/:location', updateJobByLocation);
jobRouter.delete('/jobs/:id', deleteJobById);
export default jobRouter; 
