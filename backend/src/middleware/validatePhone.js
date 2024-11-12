export const validatePhone = (req, res, next) => {
        const { contactPhone } = req.body;
        const phoneRegex = /^(\(\d{3}\)|\d{3})[- ]?\d{3}[- ]?\d{4}$/; // (123) 456-7890, 123-456-7890, or 1234567890 should be accepted

    if (contactPhone && !phoneRegex.test(contactPhone)) {
        return res.status(400).json({ message: 'Invalid phone number format' });
    }
    next();
};
