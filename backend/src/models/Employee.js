import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

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

Employee.associate = (models) => {
    Employee.belongsToMany(models.Job, {
        through: 'EmployeeJob',
        foreignKey: 'employeeId',
        otherKey: 'jobId',
    });
    Employee.hasMany(models.TimeLog, {
        foreignKey: 'employeeId',
    });
};

export default Employee;
