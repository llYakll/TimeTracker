import { expect } from 'chai';
import { describe, it, before } from 'mocha';
import Customer from '../../src/models/Customer.js';
import sequelize from '../../src/config/database.js';

describe('Customer Model', () => {
  before(async () => {
    await sequelize.sync({ force: true });
  });

  it('should create a new customer', async () => {
    const customer = await Customer.create({
    id: 1,
    name: 'Missouri Conservation',
    email: 'john.doe@example.com',
    contactName: 'John Doe',
    contactPhone: '555-1234',
    contactEmail: 'john.doe@example.com'
    });

    console.log(JSON.stringify(customer, null, 2));

    expect(customer.id).to.be.a('number');
    expect(customer.name).to.equal('Missouri Conservation');
    expect(customer.email).to.equal('john.doe@example.com');
    expect(customer.contactName).to.equal('John Doe');
    expect(customer.contactPhone).to.equal('555-1234');
    expect(customer.contactEmail).to.equal('john.doe@example.com');
    });
});
