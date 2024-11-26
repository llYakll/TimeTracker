import Employee from "../models/Employee.js";

export const createEmployee = async (req, res, next) => {
    try {
        const employee = await Employee.create(req.body);
        console.log('Employee created');
        res.status(201).json(employee);
    } catch (error) {
        next(error);
    }
};
export const getAllEmployees = async (req, res, next) => {
    try {
        const employees = await Employee.findAll();
        console.log('All employees retrieved');
        res.status(200).json(employees);
    } catch (error) {
        next(error);
    }
};
export const getEmployeeById = async (req, res, next) => {
    const employeeId = req.params.id;
    if (isNaN(employeeId)) {
        return res.status(400).json({ message: 'Invalid employee ID', error: 'Bad Request' });
    }
    try {
        const employee = await Employee.findByPk(employeeId);
        if (employee) {
            console.log('Employee found');
            res.status(200).json(employee);
        } else {
            res.status(404).json({ message: 'Employee not found', error: 'Not Found' });
        }
    } catch (error) {
        next(error);
    }
};

export const updateEmployee = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({ message: 'No data provided to update' });
    }
    const employeeId = req.params.id;
    if (isNaN(employeeId)) {
        return res.status(400).json({ message: 'Invalid employee ID' });
    }
    try {
        const employee = await Employee.findByPk(employeeId);
        if (employee) {
            await employee.update(req.body);
            console.log('Employee updated');
            res.status(200).json(employee);
        } else {
            res.status(404).json({ message: 'Employee not found' });
        }
    } catch (error) {
        next(error);
    }
};

export const deleteEmployeeById = async (req, res, next) => {
    const employeeId = req.params.id;
    if (isNaN(employeeId)) {
        return res.status(400).json({ message: 'Invalid employee ID' });
    }
    try {
        const employee = await Employee.findByPk(employeeId);
        if (employee) {
            await employee.destroy();
            console.log('Employee deleted');
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Employee not found' });
        }
    } catch (error) {
        next(error);
    }
};