exports.handleServerError = (res, error) => {
    console.error('server error:', error);
    res.status(500).json({ error: 'An internal server error occurred. Please try again later.' });
};
