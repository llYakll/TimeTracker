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

router.post('/', validatePhone, createCustomer);
router.get('/', getAllCustomers);
router.get('/:id', getCustomerById);
router.put('/:id', validatePhone, updateCustomer);
router.delete('/:id', deleteCustomerById);

export default router;
