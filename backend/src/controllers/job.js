import Job from "../models/Job.js";

// Create Job (C)
export const createJob = async (req, res) => {
    try {
        const { title, description, customerId, structureType, structureHeight, jobType, mileage, location } = req.body;
        const newJob = await Job.create({ title, description, customerId, structureType, structureHeight, jobType, mileage, location });
        res.status(201).json(newJob);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Read All Jobs (R)
export const getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.findAll();
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Read Job by ID (R)
export const getJobById = async (req, res) => {
    try {
        const job = await Job.findByPk(req.params.id);
        if (job) {
            res.status(200).json(job);
        } else {
            res.status(404).json({ message: 'Job not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update Job (U)
export const updateJob = async (req, res) => {
    try {
        const [updated] = await Job.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedJob = await Job.findByPk(req.params.id);
            res.status(200).json(updatedJob);
        } else {
            res.status(404).json({ message: 'Job not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete Job by ID (D)
export const deleteJobById = async (req, res) => {
    try {
        const deleted = await Job.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(200).json({ message: 'Job deleted successfully' });
        } else {
            res.status(404).json({ message: 'Job not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
