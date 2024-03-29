const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const ImageFileDbo = require('../models/ImageFileDbo');

module.exports.getImage = async function(imageId) {
  const image = await prisma.imagefile.findUnique({
    where: {
      id: parseInt(imageId),
    },
  });

  if (!image) {
    return null;
  }

  const imageDbo = new ImageFileDbo({
    id: image.id,
    filePath: image.filePath,
    title: image.title,
    photoTakenDate: image.photoTakenDate,
    description: image.description,
    createdDate: image.createdDate,
  });
  return imageDbo;
};

module.exports.getAllImages = async function() {
  const allImages = await prisma.imagefile.findMany({
    orderBy: [
      {
        createdDate: 'desc',
      },
    ],
  });

  const allImageDbos = [];

  for (let image of allImages) {
    allImageDbos.push(
      new ImageFileDbo({
        id: image.id,
        filePath: image.filePath,
        title: image.title,
        photoTakenDate: image.photoTakenDate,
        description: image.description,
        createdDate: image.createdDate,
      })
    );
  }

  return allImageDbos;
};

module.exports.newImage = async function(imageFile) {
  const imageFileDbo = await prisma.imagefile.create({
    data: {
      filePath: imageFile.filePath,
      title: imageFile.title,
      photoTakenDate: new Date(imageFile.photoTakenDate),
      description: imageFile.description,
    },
  });

  return new ImageFileDbo({
    id: imageFileDbo.id,
    filePath: imageFileDbo.filePath,
    title: imageFileDbo.title,
    photoTakenDate: imageFileDbo.photoTakenDate,
    description: imageFileDbo.description,
    createdDate: imageFileDbo.createdDate,
  });
};
