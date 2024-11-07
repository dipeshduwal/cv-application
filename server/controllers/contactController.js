const { sendMessageService } = require('../services/contactServices');

exports.sendMessage = async (req, res) => {
    const { name, email, message } = req.body;
    const response = await sendMessageService(name, email, message);
    res.status(200).json(response);
};

