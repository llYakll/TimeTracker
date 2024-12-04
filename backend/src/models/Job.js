import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Job = sequelize.define('Job', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    customerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Customers',
            key: 'id',
        },
    },
    structureType: {
        type: DataTypes.ENUM('Self-Supporting', 'Guyed', 'Monopole', 'Non-Standard'),
        allowNull: false,
    },
    structureHeight: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    jobType: {
        type: DataTypes.ENUM('Install', 'Decomission', 'Maintenance'),
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

Job.associate = (models) => {
    Job.belongsToMany(models.Employee, {
        through: 'EmployeeJob',
        foreignKey: 'jobId',
        otherKey: 'employeeId',
    });
    Job.belongsTo(models.Customer, {
        foreignKey: 'customerId',
    });
    Job.hasMany(models.TimeLog, {
        foreignKey: 'jobId',
    });
};

export default Job;
