const ImageCloudStorage = require('../models/ImageCloudStorage');
const ImageFileDbo = require('../models/ImageFileDbo');
module.exports.newImage = async function(req, res) {
  try {
    const imageDetails = JSON.parse(req.body.imageDetails);

    imageDetails.filePath = req.file.originalname;

    const newImage = await ImageFileDbo.create(imageDetails);
    const cloudResponse = await ImageCloudStorage.saveBinaryImage(
      req.file.originalname,
      req.file.buffer
    );
    console.log(cloudResponse);
    res.status(200).send(newImage);
  } catch (err) {
    console.log(err);
    res.status(501).send({
      error: 'Could not save image',
    });
  }
};
