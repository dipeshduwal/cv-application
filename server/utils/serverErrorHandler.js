exports.handleServerError = (res, error) => {
    console.error('Internal Server Error:', error.message); 
    res.status(500).json({ error: 'An internal server error occurred. Please try again later.' });
};
