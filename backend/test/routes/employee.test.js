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
        expect(res.body.length).to.be.greaterThan(0);
        expect(res.body[0]).to.have.property('id');
        expect(res.body[0]).to.have.property('firstName');
        expect(res.body[0]).to.have.property('lastName');
        expect(res.body[0]).to.have.property('email');
        expect(res.body[0]).to.have.property('password');

    });

    it('should get an employee by ID', async () => {
        const res = await request(app).get(`/api/employees/${employeeId}`);
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.id).to.equal(employeeId);
        expect(res.body.firstName).to.equal('John');
        expect(res.body.lastName).to.equal('Doe');
        expect(res.body.email).to.equal('john@example.com');
        expect(res.body.password).to.equal('password');
        expect(res.body.role).to.equal('admin');
    });

    it('should create a new employee', async () => {
        const newEmployee = { firstName: 'Jane', lastName: 'Doe', email: 'jane@example.com', password: 'password', role: 'user' };
        const res = await request(app).post('/api/employees').send(newEmployee);
        expect(res.status).to.equal(201);
        expect(res.body).to.be.an('object');
        expect(res.body.firstName).to.equal(newEmployee.firstName);
        expect(res.body.lastName).to.equal(newEmployee.lastName);
        expect(res.body.email).to.equal(newEmployee.email);
        expect(res.body.password).to.equal(newEmployee.password);
        expect(res.body.role).to.equal(newEmployee.role);
    });

    it('should update an employee by ID', async () => {
        const updatedEmployee = { firstName: 'Johnny', lastName: 'Doesnt', email: 'johnny@example.com', password: 'password1', role: 'admin' };
        const res = await request(app).put(`/api/employees/${employeeId}`).send(updatedEmployee);
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.firstName).to.equal(updatedEmployee.firstName);
        expect(res.body.lastName).to.equal(updatedEmployee.lastName);
        expect(res.body.email).to.equal(updatedEmployee.email);
        expect(res.body.password).to.equal(updatedEmployee.password);
        expect(res.body.role).to.equal(updatedEmployee.role);

    });

    it('should delete an employee by ID', async () => {
        const res = await request(app).delete(`/api/employees/${employeeId}`);
        expect(res.status).to.equal(204);
    });
    

    it('should return an error if employee ID is not found', async () => {
        const res = await request(app).get('/api/employees/9999');
        expect(res.status).to.equal(404);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.equal('Employee not found');
        expect(res.body.error).to.equal('Not Found');

    });

}); 