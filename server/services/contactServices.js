const { sendContactEmail } = require('../utils/emailHelper');

const sendMessageService = async (name, email, message) => {
    if (!name || !email || !message) {
        throw new Error('All fields are required.');
    }

    await sendContactEmail(name, email, message);

    return { message: 'Message sent successfully!' };
};

module.exports = { sendMessageService };
