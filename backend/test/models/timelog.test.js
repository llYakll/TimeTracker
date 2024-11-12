import { expect } from 'chai';
import { describe, it, before } from 'mocha';
import sequelize from '../../src/config/database.js';
import TimeLog from '../../src/models/TimeLog.js';
import Employee from '../../src/models/Employee.js';
import Customer from '../../src/models/Customer.js';
import Job from '../../src/models/Job.js';

describe('TimeLog Model', () => {
  before(async () => {
    await sequelize.sync({ force: true });

/*we have to create these tables first before we can create a time log because
 they are foreign keys in the time log model. look dad, i'm learning!*/

    await Employee.create({ id: 1, firstName: 'John', lastName: 'Doe', email: 'johndoe@example.com', password: 'password' });
    await Customer.create({ id: 1, name: 'Example Corp', email: 'contact@example.com', contactName: 'Jane Smith', contactPhone: '123-456-7890', contactEmail: 'jane@example.com' });
    await Job.create({ id: 1, title: 'Tower Installation', description: 'Install a new tower', customerId: 1, structureType: 'Monopole', structureHeight: 100, jobType: 'install', location: 'Site A' });
  });

  it('should create a new time log', async () => {
    const timeLog = await TimeLog.create({
      employeeId: 1,
      customerId: 1,
      jobId: 1,
      clockInTime: new Date(),
      clockOutTime: new Date(),
      activityType: 'Shop',
    });

    console.log(JSON.stringify(timeLog, null, 2));

    expect(timeLog.employeeId).to.equal(1);
    expect(timeLog.customerId).to.equal(1);
    expect(timeLog.jobId).to.equal(1);
    expect(timeLog.clockInTime).to.be.a('date');
    expect(timeLog.clockOutTime).to.be.a('date');
    expect(timeLog.activityType).to.equal('Shop');
  });
});
