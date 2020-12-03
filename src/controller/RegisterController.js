const UsersFactory = require('../models/UsersFactory')
const SecureCookieOptions = require('../policies/SecureCookieOptions')
const JWT = require('../policies/JWT')


module.exports = {

    async register (req, res) {
        try {
            const usersFactory = new UsersFactory();


            const user = await usersFactory.create(
                req.body.email,
                req.body.username,
                req.body.password,
                req.body.locationId)

            const token = await JWT.signUser(user)




            res.cookie(JWT.cookieName, token, SecureCookieOptions.cookieOptions())
            res.send({
                email: user.email,
                username: user.username
            })
        } catch (err) {
            console.log(err)
            res.status(400).send({
                error: 'This email account or username is already in use'
            })
        }
    }

}
