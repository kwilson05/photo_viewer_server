const ImageCloudStorage = require('../models/ImageCloudStorage');
const {
  getImage,
  getAllImages,
  newImage,
} = require('../factory/ImageFileFactory');
module.exports.new = async function(req, res) {
  try {
    const imageDetails = JSON.parse(req.body.imageDetails);

    imageDetails.filePath = req.file.originalname;

    const imageDbo = await newImage(imageDetails);
    await ImageCloudStorage.saveBinaryImage(
      req.file.originalname,
      req.file.buffer
    );
    res.status(200).send(imageDbo.json);
  } catch (err) {
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
    res.status(501).send('Could not get all images');
  }
};

module.exports.get = async function(req, res) {
  try {
    const imageDbo = await getImage(req.params.id);

    if (!imageDbo) {
      res.status(400).send({ error: "Image doesn't exist" });
    }

    res.status(200).send(imageDbo.json);
  } catch (err) {
    res.status(501).send('Failed finding image');
  }
};
