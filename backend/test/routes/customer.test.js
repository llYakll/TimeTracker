import { expect } from 'chai';
import request from 'supertest';
import app from '../../src/server.js';

describe('Customer Routes', () => {
    let customerId;

    beforeEach(async () => {
        const newCustomer = { name: 'John Doe', email: 'john@example.com', contactName: 'John Contact', contactPhone: '(123) 456-7890', contactEmail: 'contact@example.com' };
        const res = await request(app).post('/api/customers').send(newCustomer);
        customerId = res.body.id;
    });

    afterEach(async () => {
        await request(app).delete(`/api/customers/${customerId}`);
    });

    it('should create a new customer', async () => {
        const newCustomer = { name: 'Jane Smith', email: 'jane@example.com', contactName: 'Jane Contact', contactPhone: '(123) 456-7890', contactEmail: 'contact@example.com' };
        const res = await request(app).post('/api/customers').send(newCustomer);
        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('id');
        await request(app).delete(`/api/customers/${res.body.id}`);
    });

    it('should retrieve all customers', async () => {
        const res = await request(app).get('/api/customers');
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
    });

    it('should retrieve a specific customer by ID', async () => {
        const res = await request(app).get(`/api/customers/${customerId}`);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('id').equal(customerId);
    });

    it('should update a specific customer', async () => {
        const updatedCustomerData = { name: 'Jane Doe' };
        const res = await request(app).put(`/api/customers/${customerId}`).send(updatedCustomerData);
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal(updatedCustomerData.name);
    });

    it('should return 400 for invalid phone number format', async () => {
        const invalidData = { contactPhone: '123-45-6789' };
        const res = await request(app).put(`/api/customers/${customerId}`).send(invalidData);
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('Invalid phone number format');
    });

    it('should delete a specific customer by ID', async () => {
        const res = await request(app).delete(`/api/customers/${customerId}`);
        expect(res.status).to.equal(204);
        const checkRes = await request(app).get(`/api/customers/${customerId}`);
        expect(checkRes.status).to.equal(404);
    });

    it('should return 404 when deleting a non-existent customer', async () => {
        const res = await request(app).delete('/api/customers/999999');
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('Customer not found');
    });

    it('should return 400 for invalid customer ID format', async () => {
        const res = await request(app).get('/api/customers/invalidID');
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('Invalid customer ID');
    });
});
