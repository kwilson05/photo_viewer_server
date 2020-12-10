var express = require('express');
var router = express.Router();
const Controller = require('../controller/UserController');

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

router.get('/', Controller.get);

module.exports = router;
