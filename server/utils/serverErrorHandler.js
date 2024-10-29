exports.handleServerError = (res, error) => {
    console.error('Server Error:', error);
    res.status(500).json({ error: 'An internal server error occurred. Please try again later.' });
};
