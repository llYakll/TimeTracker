import Employee from "../models/Employee";

// Create Employee (C)
export const createEmployee = async (req, res, next) => {
    try {
        const employee = await Employee.create(req.body);
            console.log('Employee created');
            res.status(201).json(employee);
        } catch (error) {
            next(error);
        }
};

// Read All Employees (R)
export const getAllEmployees = async (req, res, next) => {
    try {
        const employees = await Employee.findAll();
            console.log('All employees retrieved');
            res.status(200).json(employees);
        } catch (error) {
            next(error);
        }
};

// Read Employee by ID (R)
export const getEmployeeById = async (req, res, next) => {
    const employeeId = req.params.id;

    if (isNaN(employeeId)) {
        return res.statuse(400).json({ message: 'Invalid employee ID' });
    }

    try {
        const employee = await Employee.findByPk(employeeId);
            if (employee) {
                console.log('Customer found');
                res.status(200).json(employee);
            } else {
                res.status(404).json({ message: 'Employee not found' });
            }
        } catch (error) {
            next(error);
        }
};  

// Update Employee (U)
export const updateEmployee = async (req, res) => {
    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({ message: 'No data provided to update' });
    }

    try {
        const [updated] = await Employee.update(req.body, {
            where: { id: req.params.id }
        });

        if (updated === 0) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        const updatedEmployee = await Employee.findByPk(req.params.id);
        console.log('Employee updated');
        res.status(200).json(updatedEmployee);
    } catch (error) {
        next(error);
    }
};

// Delete Employee by ID (D)
export const deleteEmployeeById = async (req, res) => {
    try {
        const deleted = await Employee.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(200).json({ message: 'Employee deleted successfully' });
        } else {
            res.status(404).json({ message: 'Employee not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
