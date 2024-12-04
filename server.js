import dotenv from 'dotenv';
import app from './backend/src/app.js';
import sequelize from './backend/src/config/database.js';

dotenv.config('.env');

console.log(process.env.PORT);
console.log(process.env.HOST);
console.log(process.env.USER);
console.log(process.env.NAME);

const PORTS = process.env.PORTS || 3000;

async function gracefulShutdown(signal) {
    try {
        console.log(`Received ${signal}. Shutting down gracefully...`);
        await sequelize.close();
        console.log('Database connection closed.');
        process.exit(0);
    } catch (error) {
        console.error('Error during shutdown:', error.message);
        process.exit(1);
    }
}

async function startServer() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        app.listen(PORTS, () => {
            console.log(`Server is running on port ${PORTS}`);
        });

        ['SIGINT', 'SIGTERM'].forEach((signal) => {
            process.on(signal, () => gracefulShutdown(signal));
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error.message);
        process.exit(1);
    }
}

startServer();
