const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (req, res, next) => {
    const authHeader = req.header('Authorization');
    
    // Check for the presence of the token
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    const token = authHeader.split(' ')[1]; // Extract the token part

    try {
        // Verify the token and decode the payload
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Ensure decoded token has email
        if (!decoded.email) {
            return res.status(401).json({ message: 'Token does not contain email' });
        }

        // Set user information (including email) to request object
        req.user = {
            email: decoded.email, // Assuming the email is stored in the token
            // Add any other user properties you want to include here
        };

        // Continue to the next middleware
        next();
    } catch (err) {
        console.error('Token verification error:', err);
        res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = authMiddleware;


