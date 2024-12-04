import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Customer = sequelize.define('Customer', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    contactName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    contactPhone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    contactEmail: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

Customer.associate = (models) => {
    Customer.hasMany(models.Job, {
        foreignKey: 'customerId',
        as: 'jobs'
    });
    Customer.hasMany(models.TimeLog, {
        foreignKey: 'customerId',
    });
};

export default Customer;
