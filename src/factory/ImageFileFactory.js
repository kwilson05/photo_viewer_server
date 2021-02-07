const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const ImageFileDbo = require('../models/ImageFileDbo');

module.exports.getAllImages = async function() {
  const allImages = await prisma.imagefile.findMany();

  const allImageDbos = [];

  for (let image of allImages) {
    allImageDbos.push(
      new ImageFileDbo(
        image.id,
        image.filePath,
        image.title,
        image.photoTakeDate,
        image.description
      )
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

  return new ImageFileDbo(
    imageFileDbo.id,
    imageFileDbo.filePath,
    imageFileDbo.title,
    imageFileDbo.photoTakeDate,
    imageFileDbo.description
  );
};
