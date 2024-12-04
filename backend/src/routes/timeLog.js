import express from 'express';
import { createTimeLog, getAllTimeLogs, getTimeLogById, updateTimeLog, deleteTimeLogById } from '../controllers/timeLog.js';

const timeLogRouter = express.Router();

timeLogRouter.post('/', createTimeLog);
timeLogRouter.get('/', getAllTimeLogs);
timeLogRouter.get('/:id', getTimeLogById);
timeLogRouter.put('/:id', updateTimeLog); 
timeLogRouter.delete('/:id', deleteTimeLogById); 

export default timeLogRouter; 
