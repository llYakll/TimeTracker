import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

/*
This is the employee model for the time tracking database.
This model has employee details and designates whether or not 
the account is an admin account.
*/

const Employee = sequelize.define('Employee', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'user',
    },
});

// RELATIONSHIP
Employee.associate = (models) => {
    Employee.belongsToMany(models.Job, {
        through: 'EmployeeJob',
        foreignKey: 'employeeId',
        otherKey: 'jobId',
    });
};

export default Employee;
