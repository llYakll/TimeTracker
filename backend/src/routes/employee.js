import express from 'express';
import { createEmployee,
         getAllEmployees,
         getEmployeeById,
         getEmployeeJobs,
         updateEmployee,
         deleteEmployeeById } from '../controllers/employee.js';

const employeeRouter = express.Router(); // i explicitly named the router so if it is used elsewhere it is clear what it is.

//if user makes a z request to x, it will execute y function.
employeeRouter.post('/', createEmployee); // Create a new employee
employeeRouter.get('/', getAllEmployees); // Get all employees
employeeRouter.get('/:id', getEmployeeById); // Get a specific employee by ID
employeeRouter.get('/:id/jobs', getEmployeeJobs)// Get the jobs assigned to an Employee
employeeRouter.put('/:id', updateEmployee); // Update a specific employee
employeeRouter.delete('/:id', deleteEmployeeById); // Delete a specific employee

export default employeeRouter; 
