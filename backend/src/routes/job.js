import express from 'express';
import { createJob, getAllJobs, getJobById, updateJob, deleteJobById } from '../controllers/job.js';

const jobRouter = express.Router(); // Explicitly named router so if used elsewhere it is clear what it is.

//if z request is made to y endpoint it will execute x function.
jobRouter.post('/jobs', createJob); 
jobRouter.post('/jobs/:id/employees', addEmployeeToJob)
jobRouter.get('/jobs', getAllJobs);
jobRouter.get('/jobs/:id', getJobById);
jobRouter.get('/jobs/:id/employees', getEmployeesByJob)
jobRouter.get('/jobs/employees/:firstName/:lastName', getJobsByEmployeeName)
jobRouter.get('/jobs/:id/timelogs', getTimelogsByJob)
jobRouter.get('/jobs/customers/:customerName', getJobsByCustomerName)
jobRouter.put('/jobs/:id', updateJob); 
jobRouter.delete('/jobs/:id', deleteJobById);

export default jobRouter; 
