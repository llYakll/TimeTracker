import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

//first i need to load the env variables
dotenv.config('./../.env');


//verify that the env variables are loaded

console.log(process.env.NAME);
console.log(process.env.USER);
console.log(process.env.PASSWORD);
console.log(process.env.HOST);
console.log(process.env.DIALECT);


//then i need to init a sequelize connection
const sequelize = new Sequelize(
    process.env.NAME,
    process.env.USER,
    process.env.PASSWORD,
    {
        host: process.env.HOST,
        dialect: process.env.DIALECT || 'mysql',
    }
);

//after env values have been confirmed and connection is established, export the sequelize connection
export default sequelize;