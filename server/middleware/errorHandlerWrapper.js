const { handleServerError} = require('../utils/serverErrorHandler');

const errorHandlerWrapper = (controller) => {
    return async (req, res, next) => {
        try {
            await controller(req, res, next);
        } catch (error) {
            handleServerError(res, error);
        }
    };
};

module.exports = errorHandlerWrapper;