const ImageCloudStorage = require('../models/ImageCloudStorage');
const ImageFileDbo = require('../models/ImageFileDbo');
module.exports.newImage = async function(req, res) {
  try {
    await ImageCloudStorage.saveBinaryImage(
      req.file.originalname,
      req.file.buffer
    );

    const imageDetails = JSON.parse(req.body.imageDetails);

    const imageFile = {
      title: imageDetails.title,
      description: imageDetails.description,
      photoTakeDate: imageDetails.photoTakeDate,
      filePath: req.file.originalname,
    };
    ImageFileDbo.create(imageFile);
    res.status(200).send({});
  } catch (err) {
    res.status(501).send({
      error: 'Could not save image',
    });
  }
};
