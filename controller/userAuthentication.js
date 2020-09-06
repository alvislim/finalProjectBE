const httpResponse = require('../utilities/httpResponse');

module.exports = {
    verifyUser: (req, res) => {
        res.send(req.user)
    },
    logout: (req, res) => {
        req.logout()
        httpResponse(res, 200, true, 'User successfully logout', null)
    },
    healthCheck: (req, res) => {
        res.send('hi')
    }
} 