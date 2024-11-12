import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

/*
This is the time log model for tracking employee hours.
It captures clock in/out times, activity type, and associations to employee, job, and customer.
*/

const TimeLog = sequelize.define('TimeLog', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    employeeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Employees',  // Ensure correct plural table name
            key: 'id',
        },
    },

    customerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Customers',  // Ensure correct plural table name
            key: 'id',
        },
    },

    jobId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Jobs',  // Ensure correct plural table name
            key: 'id',
        },
    },

    clockInTime: {
        type: DataTypes.DATE,
        allowNull: false,
    },

    clockOutTime: {
        type: DataTypes.DATE,
        allowNull: true,
    },

    activityType: {
        type: DataTypes.ENUM('Shop', 'Travel', 'Ground', 'Tower'),
        allowNull: false,
    },

    location: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});

// RELATIONSHIPS
TimeLog.associate = (models) => {
    TimeLog.belongsTo(models.Employee, { 
        foreignKey: 'employeeId' 
    });
    TimeLog.belongsTo(models.Customer, { 
        foreignKey: 'customerId' 
    });
    TimeLog.belongsTo(models.Job, { 
        foreignKey: 'jobId' 
    });
};

export default TimeLog;
