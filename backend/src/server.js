import express from 'express';
import customerRoutes from './routes/customer.js';

const app = express();
app.use(express.json());
app.use('/api', customerRoutes);

app.use((err, req, res, next) => {
    res.status(500).json({ error: err.message });
});

export default app;
