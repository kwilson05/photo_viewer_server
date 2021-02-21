const express = require('express');
const router = express.Router();
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const Controller = require('../controller/ImageController');

router.use(function timeLog(req, res, next) {
  console.log('Image Route: ', Date.now());
  next();
});

router.post('/', upload.single('imageFile'), Controller.new);
router.post('/:id', Controller.edit);
router.get('/', Controller.getAll);
router.get('/:id', Controller.get);

module.exports = router;
