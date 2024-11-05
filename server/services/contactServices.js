const { sendContactEmail } = require('../utils/emailHelper');

const sendMessageService = async (name, email, message) => {
    if (!name || !email || !message) {
        throw new Error('All fields are required.');
    }

    sendContactEmail(name, email, message);

    return { message: 'Message sent successfully!' };
};

module.exports = { sendMessageService };
