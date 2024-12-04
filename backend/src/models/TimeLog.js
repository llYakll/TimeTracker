import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const TimeLog = sequelize.define("TimeLog", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  employeeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Employees",
      key: "id",
    },
  },
  customerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Customers",
      key: "id",
    },
  },
  jobId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Jobs",
      key: "id",
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
    type: DataTypes.ENUM("Shop", "Travel", "Tower", "Ground"),
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

TimeLog.associate = (models) => {
  TimeLog.belongsTo(models.Employee, { foreignKey: "employeeId" });
  TimeLog.belongsTo(models.Customer, { foreignKey: "customerId" });
  TimeLog.belongsTo(models.Job, { foreignKey: "jobId" });
};

export default TimeLog;
