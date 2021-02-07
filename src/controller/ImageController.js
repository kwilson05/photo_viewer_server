const ImageCloudStorage = require('../models/ImageCloudStorage');
const { getAllImages, newImage } = require('../factory/ImageFileFactory');
module.exports.new = async function(req, res) {
  try {
    const imageDetails = JSON.parse(req.body.imageDetails);

    imageDetails.filePath = req.file.originalname;

    const newImageDbo = await newImage(imageDetails);
    await ImageCloudStorage.saveBinaryImage(
      req.file.originalname,
      req.file.buffer
    );
    res.status(200).send(newImageDbo.json);
  } catch (err) {
    console.log(err);
    res.status(501).send({
      error: 'Could not save image',
    });
  }
};

module.exports.getAll = async function(req, res) {
  try {
    const allImageDbos = await getAllImages();

    const allImages = [];

    for (let imageDbo of allImageDbos) {
      allImages.push(imageDbo.json);
    }

    res.status(200).send(allImages);
  } catch (err) {
    console.log(err);
    res.status(501).send('Could not get all images');
  }
};
