import Customer from "../models/Customer.js";

// Create Customer (C)
export const createCustomer = async (req, res, next) => {
    try {
        const customer = await Customer.create(req.body);
};

// Read All Customers (R)
export const getAllCustomers = async (req, res, next) => {
    try {
        const customers = await Customer.findAll();
        console.log('All customers retrieved');
        res.status(200).json(customers);
    } catch (error) {
        next(error);
    }
};

// Read Customer by ID (R)
export const getCustomerById = async (req, res, next) => {
    const customerId = req.params.id; 

    if (isNaN(customerId)) {
        return res.status(400).json({ message: 'Invalid customer ID' });
    }

    try {
        const customer = await Customer.findByPk(customerId);
            if (customer) {
                console.log('Customer found');
                res.status(200).json(customer);
            } else {
                res.status(404).json({ message: 'Customer not found' });
            }
        } catch (error) {
            next(error);
        }
};

// Update Customer (U)
export const updateCustomer = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({ message: 'No data provided to update' });
    }

    try {
        const [updated] = await Customer.update(req.body, {
            where: { id: req.params.id }
        });

        if (updated === 0) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        const updatedCustomer = await Customer.findByPk(req.params.id);
        console.log('Customer updated successfully');
        res.status(200).json(updatedCustomer);
    } catch (error) {
        next(error);
    }
};

// Delete Customer by ID (D)
export const deleteCustomerById = async (req, res, next) => {
    try {
        const deleted = await Customer.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            console.log('Customer deleted successfully');
            res.status(204).end();
        } else {
            res.status(404).json({ message: 'Customer not found' });
        }
    } catch (error) {
        next(error);
    }
};
