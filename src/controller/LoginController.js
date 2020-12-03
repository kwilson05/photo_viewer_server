const UsersFactory = require('../models/UsersFactory')
const SecureCookieOptions = require('../policies/SecureCookieOptions')
const JWT = require('../policies/JWT')
const PasswordComparer = require('../utils/PasswordComparer')


module.exports = {

    async login (req, res) {
        try {
            const usersFactory = new UsersFactory();


            const { email, password } = req.body


            const userJson = await usersFactory.byEmail(email)

            if (!userJson) {
                return res.status(403).send({
                    error: 'The login information was incorrect'
                })
            }

            //compare user entered password vs hashed password
            const isPasswordValid = await PasswordComparer.compare(password, userJson.password)

            if (!isPasswordValid) {
                return res.status(403).send({
                    error: 'The login information was incorrect'
                })
            }

            const token = await JWT.signUser(userJson)


            res.send(token)
        } catch (err) {
            console.log(err)
            res.status(400).send({
                error: 'The login information was incorrect'
            })
        }
    }

}
