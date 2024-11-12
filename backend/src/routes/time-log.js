import express from 'express';
import { createTimeLog, getAllTimeLogs, getTimeLogById, updateTimeLog, deleteTimeLogById } from '../controllers/timeLogController.js';

const timeLogRouter = express.Router(); // Explicitly named router so if used elsewhere it is clear what it is.

//if z request is made to y endpoint it will execute x function.
timeLogRouter.post('/', createTimeLog); // Create a new time log
timeLogRouter.get('/', getAllTimeLogs); // Get all time logs
timeLogRouter.get('/:id', getTimeLogById); // Get a specific time log by ID
timeLogRouter.put('/:id', updateTimeLog); // Update a specific time log
timeLogRouter.delete('/:id', deleteTimeLogById); // Delete a specific time log

export default timeLogRouter; 
