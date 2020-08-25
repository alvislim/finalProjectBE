const httpResponse = (res, statusCode, success, message, payload) => {
    return res.status(statusCode).json({
        success: success,
        message: message,
        payload: payload
    })
}

module.exports = httpResponse;
