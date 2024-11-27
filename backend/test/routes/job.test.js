import { expect } from 'chai';
import request from 'supertest';
import app from '../../src/server.js';
import sequelize from '../../src/config/database.js';

before(async () => {
  await sequelize.sync({ force: true });
});

it('should create a new job', async () => {
  const newJob = {
    title: 'Test Job',
    description: 'This is a test job',
    customerId: 1,
    structureType: 'Self-Supporting',
    structureHeight: 180,
    jobType: 'Install',
    mileage: 100,
    location: 'Test Location',
  };

  const res = await request(app).post('/api/jobs').send(newJob);
  expect(res.status).to.equal(201);
  expect(res.body).to.have.property('id');
  expect(res.body.title).to.equal(newJob.title);
  expect(res.body.description).to.equal(newJob.description);
  expect(res.body.customerId).to.equal(newJob.customerId);
  expect(res.body.structureType).to.equal(newJob.structureType);
  expect(res.body.structureHeight).to.equal(newJob.structureHeight);
  expect(res.body.jobType).to.equal(newJob.jobType);
  expect(res.body.mileage).to.equal(newJob.mileage);
  expect(res.body.location).to.equal(newJob.location);

  
  });
  it('should get all jobs', async () => {
    
    const res = await request(app).get('/api/jobs');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.greaterThan(0);
    expect(res.body[0]).to.have.property('id');
    expect(res.body[0]).to.have.property('title');
    expect(res.body[0]).to.have.property('description');
    expect(res.body[0]).to.have.property('customerId');
    expect(res.body[0]).to.have.property('structureType');
    expect(res.body[0]).to.have.property('structureHeight');
    expect(res.body[0]).to.have.property('jobType');
    expect(res.body[0]).to.have.property('mileage');

});

it('should get a job by ID', async () => {
  const res = await request(app).get('/api/jobs/1');
  expect(res.status).to.equal(200);
  expect(res.body).to.have.property('id');
  expect(res.body).to.have.property('title');
  expect(res.body).to.have.property('description');
  expect(res.body).to.have.property('customerId');
  expect(res.body).to.have.property('structureType');
  expect(res.body).to.have.property('structureHeight');
  expect(res.body).to.have.property('jobType');
  expect(res.body).to.have.property('mileage');
  expect(res.body).to.have.property('location');
  expect(res.body).to.have.property('createdAt');
  expect(res.body).to.have.property('updatedAt');
});

it('should update a job', async () => {
  const updatedJob = {
    title: 'Updated Job',
    description: 'This is an updated job',
    customerId: 1,
    structureType: 'Self-Supporting',
    structureHeight: 180,
    jobType: 'Install',
    mileage: 100,
    location: 'Updated Location',
  };

  const res = await request(app).put('/api/jobs/1').send(updatedJob);
  expect(res.status).to.equal(200);
  expect(res.body).to.have.property('id');
  expect(res.body.title).to.equal(updatedJob.title);
  expect(res.body.description).to.equal(updatedJob.description);
  expect(res.body.customerId).to.equal(updatedJob.customerId);
  expect(res.body.structureType).to.equal(updatedJob.structureType);
  expect(res.body.structureHeight).to.equal(updatedJob.structureHeight);
  expect(res.body.jobType).to.equal(updatedJob.jobType);
  expect(res.body.mileage).to.equal(updatedJob.mileage);
  expect(res.body.createdAt).to.be.a('string');
  expect(res.body.updatedAt).to.be.a('string');
});

it('should delete a job', async () => {
  const res = await request(app).delete('/api/jobs/1');
  expect(res.status).to.equal(200);
  expect(res.body).to.have.property('message');
  expect(res.body.message).to.equal('Job deleted successfully');
});