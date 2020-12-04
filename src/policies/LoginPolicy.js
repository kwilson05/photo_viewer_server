const Joi = require('joi');

function loginSchema() {
  const schema = Joi.object({
    firstName: Joi.string(),
    lastName: Joi.string(),
    email: Joi.string().email(),
    password: Joi.string().regex(new RegExp('^[a-zA-Z0-9_/*/$/#&]{8,32}$')),
  });
  return schema;
}

function getErrorMessage(fieldName) {
  let error = {
    status: 400,
    msg: '',
  };

  switch (fieldName) {
    default:
      error.msg = 'Invalid login information';
  }

  return error;
}

module.exports = {
  loginValidation(req, res, next) {
    const { error, value } = loginSchema().validate(req.body);

    if (error) {
      let errorMsg = getErrorMessage(error.details[0].context.key);
      res.status(errorMsg.status).send(errorMsg.msg);
    } else {
      next();
    }
  },
};
