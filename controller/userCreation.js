const UserData = require('../models/UserData');
const httpResponse = require('../utilities/httpResponse');
const bcrypt = require('bcryptjs')

module.exports = {
    registerHandler: async (req, res) => {
        try {
            const { email, name, password } = req.body
            const user = await UserData.findOne({ email })
            if (user) httpResponse(res, 200, false, 'Email is already registered', null);
            else {
                const newUser = new UserData({
                    name,
                    email,
                    password
                });
                bcrypt.genSalt(10, async (err, salt) => {
                    try {
                        const hash = await bcrypt.hash(newUser.password, salt)
                        newUser.password = hash
                        await newUser.save()
                        httpResponse(res, 201, true, 'You have successfully onboarded with us!', null)
                    } catch (err) {
                        console.log(err)
                        throw err;
                    }
                })
            }
        } catch (err) {
            httpResponse(res, 500, false, 'Server Error', err)
        }
    }
}