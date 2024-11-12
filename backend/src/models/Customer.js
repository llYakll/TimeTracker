import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

/*
This is the customer model for the time tracking database.
This model has customer details and contact information.
*/

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

// RELATIONSHIPS
Customer.associate = (models) => {
    Customer.hasMany(models.Job, {
        foreignKey: 'customerId',
        as: 'jobs'
    });
};

export default Customer;
