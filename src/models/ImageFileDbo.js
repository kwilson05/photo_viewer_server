const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports.create = async function(imageFile) {
  console.log(imageFile);
  return await prisma.imagefile.create({
    data: {
      filePath: imageFile.filePath,
      title: imageFile.title,
      photoTakenDate: new Date(imageFile.photoTakenDate),
      description: imageFile.description,
    },
  });
};
