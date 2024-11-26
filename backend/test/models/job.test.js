import { expect } from 'chai';
import { describe, it, before } from 'mocha';
import Job from '../../src/models/Job.js';
import sequelize from '../../src/config/database.js';

describe('Job Model', () => {
  before(async () => {
    await sequelize.sync({ force: true });
  });

  it('should create a new job', async () => {
    const job = await Job.create({
      id: 1,
      title: 'Job 1',
      description: 'Job 1 description',
      customerId: 1,
      structureType: 'Self-Supporting',
      structureHeight: 180,
      jobType: 'Install',
      mileage: 100,
      location: 'Location 1',
    });

console.log(JSON.stringify(job, null, 2));

    expect(job.id).to.be.a('number');
    expect(job.title).to.equal('Job 1');
    expect(job.description).to.equal('Job 1 description');
    expect(job.customerId).to.equal(1);
    expect(job.structureType).to.equal('Self-Supporting');
    expect(job.structureHeight).to.equal(180);
    expect(job.jobType).to.equal('Install');
    expect(job.mileage).to.equal(100);
    expect(job.location).to.equal('Location 1');
    });
  
    it('should get all jobs', async () => {
      const jobs = await Job.findAll();
      expect(jobs).to.be.an('array');
      expect(jobs[0]).to.have.property('id');
      expect(jobs[0]).to.have.property('title');
      expect(jobs[0]).to.have.property('description');
      expect(jobs[0]).to.have.property('customerId');
      expect(jobs[0]).to.have.property('structureType');
      expect(jobs[0]).to.have.property('structureHeight');
      expect(jobs[0]).to.have.property('jobType');
      expect(jobs[0]).to.have.property('mileage');
      expect(jobs[0]).to.have.property('location');
      expect(jobs[0]).to.have.property('createdAt');
      expect(jobs[0]).to.have.property('updatedAt');
    });

  it('should get a job by ID', async () => {
      const job = await Job.findByPk(1);
      expect(job).to.be.an('object');
      expect(job).to.have.property('id');
      expect(job).to.have.property('title');
      expect(job).to.have.property('description');
      expect(job).to.have.property('customerId');
      expect(job).to.have.property('structureType');
      expect(job).to.have.property('structureHeight');
      expect(job).to.have.property('jobType');
      expect(job).to.have.property('mileage');
      expect(job).to.have.property('location');
      expect(job).to.have.property('createdAt');
      expect(job).to.have.property('updatedAt');
    });
  it('should update a job', async () => {
      const job = await Job.findByPk(1);
      job.title = 'Updated Job';
      await job.save();
      const updatedJob = await Job.findByPk(1);
      expect(updatedJob.title).to.equal('Updated Job');
    });

  it('should delete a job', async () => {
      const job = await Job.findByPk(1);
      await job.destroy();
      const deletedJob = await Job.findByPk(1);
      expect(deletedJob).to.be.null;
    });


  });
