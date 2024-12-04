import express from 'express';
import customerRoutes from './routes/customer.js';
import employeeRoutes from './routes/employee.js';
import jobRouter from './routes/job.js';
import timeLogRouter from './routes/timeLog.js';

const app = express();
app.use(express.json());
app.use('/api/customers', customerRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/jobs', jobRouter);
app.use('/api/timelogs', timeLogRouter)



app.use((err, req, res, next) => {
    res.status(500).json({ error: err.message });
});

export default app;
