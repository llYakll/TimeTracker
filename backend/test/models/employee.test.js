import { expect } from 'chai';
import { describe, it, before } from 'mocha';
import Employee from '../../src/models/Employee.js';
import sequelize from '../../src/config/database.js';

describe('Employee Model', () => {
  before(async () => {
    await sequelize.sync({ force: true });
  });

  it('should create a new employee', async () => {
    const employee = await Employee.create({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      role: 'user'
    });


    console.log(JSON.stringify(employee, null, 2));

    expect(employee.id).to.be.a('number');
    expect(employee.firstName).to.equal('John');
    expect(employee.lastName).to.equal('Doe');
    expect(employee.email).to.equal('john.doe@example.com');
    expect(employee.password).to.equal('password123');
    expect(employee.role).to.equal('user');
  });
});
