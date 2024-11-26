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
        expect(res.body.name).to.equal(newCustomer.name);
        expect(res.body.email).to.equal(newCustomer.email);
        expect(res.body.contactName).to.equal(newCustomer.contactName);
        expect(res.body.contactPhone).to.equal(newCustomer.contactPhone);
        expect(res.body.contactEmail).to.equal(newCustomer.contactEmail);
        expect(res.body.createdAt).to.be.a('string');

    });

    it('should retrieve all customers', async () => {
        const res = await request(app).get('/api/customers');
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.greaterThan(0);
        expect(res.body[0]).to.have.property('id');
        expect(res.body[0]).to.have.property('name');
        expect(res.body[0]).to.have.property('email');
        expect(res.body[0]).to.have.property('contactName');
        expect(res.body[0]).to.have.property('contactPhone');
        expect(res.body[0]).to.have.property('contactEmail');
        expect(res.body[0]).to.have.property('createdAt');
        expect(res.body[0]).to.have.property('updatedAt');
        
    });

    it('should retrieve a specific customer by ID', async () => {
        const res = await request(app).get(`/api/customers/${customerId}`);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('id').equal(customerId);
        expect(res.body).to.have.property('name');
        expect(res.body).to.have.property('email');
        expect(res.body).to.have.property('contactName');
        expect(res.body).to.have.property('contactPhone');
        expect(res.body).to.have.property('contactEmail');
        expect(res.body).to.have.property('createdAt');
        expect(res.body).to.have.property('updatedAt');

    });

    it('should update a specific customer', async () => {
        const updatedCustomerData = { name: 'Jane Doe' };
        const res = await request(app).put(`/api/customers/${customerId}`).send(updatedCustomerData);
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('Jane Doe');

    
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
