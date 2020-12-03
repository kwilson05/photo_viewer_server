const Joi = require('joi')

function registerSchema() {
  const schema = {
    username: Joi.string().regex(new RegExp('^[a-zA-Z0-9_]{4,32}$')),
    email: Joi.string().email(),
    password: Joi.string().regex(
      new RegExp('^[a-zA-Z0-9_/*/$/#&]{8,32}$')
    ),
    locationId: Joi.number()
  }
  return schema
}

function getErrorMessage(fieldName) {

  let error = {
    status: 400,
    msg: ''
  }

  switch (fieldName) {
    case 'password':
      error.msg =
        `The password provided failed to match the following rules:
       <br>
       1. It must contain ONLY the following characters: lower case, upper case, numerics, or special characters( _,*,$,#,& )
       <br>
       2. It must be at least 8 characters in length and not greater than 32 characters in length.`
      break;
    default:

      error.msg = 'Invalid register information'

  }

  return error
}

module.exports = {
  registerValidation(req, res, next) {

    const { error, value } = Joi.validate(req.body, signupSchema())

    if (error) {
      let errorMsg = getErrorMessage(error.details[0].context.key)
      res.status(errorMsg.status).send(errorMsg.msg)
    } else {
      next()
    }
  }
}
