import sequelize from '../config/database.js';
import Employee from '../models/Employee.js';
import Customer from '../models/Customer.js';
import Job from '../models/Job.js';
import TimeLog from '../models/TimeLog.js';
import dotenv from 'dotenv';

dotenv.config();

const seedDatabase = async () => {
    try {
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
        await sequelize.sync({ force: true });
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');        

        console.log('Database synced.');

        // Employees
        const employees = [
            {
                id: 1,
                firstName: 'Alice',
                lastName: 'Johnson',
                role: 'Technician',
                email: 'alice.johnson@example.com',
                password: 'password123',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 2,
                firstName: 'Bob',
                lastName: 'Smith',
                role: 'Technician',
                email: 'bob.smith@example.com',
                password: 'password123',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 3,
                firstName: 'Carol',
                lastName: 'Taylor',
                role: 'Manager',
                email: 'carol.taylor@example.com',
                password: 'password123',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            ]
            
        ;
        await Employee.bulkCreate(employees);
        console.log('Employees seeded.');

        // Customers
        const customers = [
            {
                id: 1,
                name: 'Customer A',
                email: 'customerA@example.com',
                contactName: 'John Doe',
                contactPhone: '1234567890',
                contactEmail: 'john.doe@example.com',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 2,
                name: 'Customer B',
                email: 'customerB@example.com',
                contactName: 'Jane Smith',
                contactPhone: '2234567890',
                contactEmail: 'jane.smith@example.com',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ];
        await Customer.bulkCreate(customers);
        console.log('Customers seeded.');

        // Jobs
        const jobs = [
            {
                id: 1,
                title: 'Tower Installation',
                description: 'Installing a new tower.',
                customerId: 1,
                structureType: 'Self-Supporting',
                structureHeight: 120,
                jobType: 'Install',
                mileage: 50,
                location: 'Site A',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 2,
                title: 'Tower Maintenance',
                description: 'Routine maintenance on the tower.',
                customerId: 2,
                structureType: 'Guyed',
                structureHeight: 150,
                jobType: 'Maintenance',
                mileage: 75,
                location: 'Site B',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            
        ];
        await Job.bulkCreate(jobs);
        console.log('Jobs seeded.');

        // TimeLogs
        const timeLogs = [
            {
                id: 1,
                employeeId: 1,
                customerId: 1,
                jobId: 1,
                clockInTime: new Date('2024-01-01T14:00:00'),
                clockOutTime: new Date('2024-01-01T18:00:00'),
                activityType: 'Shop',
                location: 'Warehouse',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 2,
                employeeId: 2,
                customerId: 2,
                jobId: 2,
                clockInTime: new Date('2024-01-01T19:00:00'),
                clockOutTime: new Date('2024-01-01T23:00:00'),
                activityType: 'Travel', 
                location: 'Site B',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ];
        await TimeLog.bulkCreate(timeLogs);
        console.log('TimeLogs seeded.');
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        await sequelize.close();
        console.log('Database connection closed.');
    }
};

seedDatabase();
