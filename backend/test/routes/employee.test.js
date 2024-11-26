import { expect } from 'chai';
import request from 'supertest';
import app from '../../src/server.js';

describe('Employee Routes', () => {
    let employeeId;

    beforeEach(async () => {
        const newEmployee = { firstName: 'John', lastName: 'Doe', email: 'john@example.com', password: 'password', role: 'admin' };
        const res = await request(app).post('/api/employees').send(newEmployee);
        employeeId = res.body.id;
    });

    afterEach(async () => {
        await request(app).delete(`/api/employees/${employeeId}`);
    });

    it('should get all employees', async () => {
        const res = await request(app).get('/api/employees');
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
    });

    it('should get an employee by ID', async () => {
        const res = await request(app).get(`/api/employees/${employeeId}`);
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.id).to.equal(employeeId);
    });

    it('should create a new employee', async () => {
        const newEmployee = { firstName: 'Jane', lastName: 'Doe', email: 'jane@example.com', password: 'password', role: 'user' };
        const res = await request(app).post('/api/employees').send(newEmployee);
        expect(res.status).to.equal(201);
        expect(res.body).to.be.an('object');
        expect(res.body.firstName).to.equal(newEmployee.firstName);
    });

    it('should update an employee by ID', async () => {
        const updatedEmployee = { firstName: 'John', lastName: 'Doe', email: 'john@example.com', password: 'password', role: 'admin' };
        const res = await request(app).put(`/api/employees/${employeeId}`).send(updatedEmployee);
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.firstName).to.equal(updatedEmployee.firstName);
    });

    it('should delete an employee by ID', async () => {
        const res = await request(app).delete(`/api/employees/${employeeId}`);
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.equal('Employee deleted successfully');
    });

    it('should return an error if employee ID is not found', async () => {
        const res = await request(app).get('/api/employees/9999');
        expect(res.status).to.equal(404);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.equal('Employee not found');
    });

}); 