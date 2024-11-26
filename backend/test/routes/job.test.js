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