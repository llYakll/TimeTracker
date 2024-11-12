import express from 'express';
import {
    createCustomer,
    getAllCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomerById
} from '../controllers/customer.js';
import { validatePhone } from '../middleware/validatePhone.js';

const router = express.Router();

router.post('/customers', validatePhone, createCustomer);
router.get('/customers', getAllCustomers);
router.get('/customers/:id', getCustomerById);
router.put('/customers/:id', validatePhone, updateCustomer);
router.delete('/customers/:id', deleteCustomerById);

export default router;
