var express = require('express');
var router = express.Router();
const Controller = require('../controller/LoginController');
const Policy = require('../policies/RegisterPolicy');

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

router.post('/', Policy.registerValidation, Controller.login);

module.exports = router;
