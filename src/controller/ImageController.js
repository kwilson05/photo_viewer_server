const ImageCloudStorage = require('../models/ImageCloudStorage');
const {
  getImage,
  getAllImages,
  newImage,
} = require('../factory/ImageFileFactory');
const { getDateByIso } = require('../utils/DateUtil');
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
    res.status(500).send({ error: 'Could not save image' });
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
    res.status(500).send('Could not get all images');
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
    res.status(500).send('Failed finding image');
  }
};

module.exports.edit = async function(req, res) {
  try {
    const imageDbo = await getImage(req.params.id);

    if (!imageDbo) {
      res.status(400).send({ error: "Image doesn't exist" });
    }

    const { photoTakenDate, description, title } = req.body.imageDetails;
    imageDbo.photoTakenDate = getDateByIso(photoTakenDate);
    imageDbo.description = description;
    imageDbo.title = title;

    await imageDbo.save();

    res.status(200).send(imageDbo.json);
  } catch (err) {
    res.status(500).send('Failed editing image');
  }
};

module.exports.batchDelete = async function(req, res) {
  const failed = [];
  const sucess = [];
  try {
    for (const imageId of req.body.imageIds) {
      try {
        const imageDbo = await getImage(imageId);
        if (!imageDbo) {
          failed.push(imageId);
        } else {
          await ImageCloudStorage.delete(imageDbo.filePath);
          await imageDbo.delete();
          sucess.push(imageId);
        }
      } catch (err) {
        failed.push(imageDbo);
      }
    }
    res.status(200).send({ sucess: sucess, failed: failed });
  } catch (err) {
    debugger;
    res.status(500).send({
      error: 'Failed while deleting images',
      sucess: sucess,
      failed: failed,
    });
  }
};
