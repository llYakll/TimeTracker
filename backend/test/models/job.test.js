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
});
