import TimeLog from "../models/timeLog.js";

// Create TimeLog (C)
export const createTimeLog = async (req, res) => {
    try {
        const { employeeId, customerId, jobId, clockInTime, clockOutTime, activityType, location } = req.body;
        const newTimeLog = await TimeLog.create({ employeeId, customerId, jobId, clockInTime, clockOutTime, activityType, location });
        res.status(201).json(newTimeLog);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Read All TimeLogs (R)
export const getAllTimeLogs = async (req, res) => {
    try {
        const timeLogs = await TimeLog.findAll();
        res.status(200).json(timeLogs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Read TimeLog by ID (R)
export const getTimeLogById = async (req, res) => {
    try {
        const timeLog = await TimeLog.findByPk(req.params.id);
        if (timeLog) {
            res.status(200).json(timeLog);
        } else {
            res.status(404).json({ message: 'Time log not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update TimeLog (U)
export const updateTimeLog = async (req, res) => {
    try {
        const [updated] = await TimeLog.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedTimeLog = await TimeLog.findByPk(req.params.id);
            res.status(200).json(updatedTimeLog);
        } else {
            res.status(404).json({ message: 'Time log not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete TimeLog by ID (D)
export const deleteTimeLogById = async (req, res) => {
    try {
        const deleted = await TimeLog.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(200).json({ message: 'Time log deleted successfully' });
        } else {
            res.status(404).json({ message: 'Time log not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
