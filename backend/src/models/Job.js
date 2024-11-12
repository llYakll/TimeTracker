import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

/*
This is the job model for the time tracking database.
This model has job details, including structure information and customer association.
*/

const Job = sequelize.define('Job', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: 'Title of the job',
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: 'Description of the job',
    },
    customerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: 'ID of the customer associated with the job',
    },
    structureType: {
        type: DataTypes.ENUM('Self-Supporting', 'Guyed', 'Monopole', 'Non-Standard'),
        allowNull: false,
        comment: 'Type of structure',
    },
    structureHeight: {
        type: DataTypes.INTEGER, 
        allowNull: false,
    },
    jobType: {
        type: DataTypes.ENUM('Install', 'Decomission', 'Maintnance'),
        allowNull: false,
    },
    mileage: {
        type: DataTypes.INTEGER, 
        allowNull: true,
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

// RELATIONSHIPS
Job.associate = (models) => {
    Job.belongsToMany(models.Employee, {
        through: 'EmployeeJob',
        foreignKey: 'jobId',
        otherKey: 'employeeId',
    });
    Job.belongsTo(models.Customer, {
        foreignKey: 'customerId',
    });
};

export default Job;
