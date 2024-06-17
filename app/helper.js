const resGenerator = (res, statusCode, apiStatus, message, data) => {
    res.status(statusCode).send({
        apiStatus: apiStatus,
        message: message,
        data
    })
}

module.exports = { resGenerator }