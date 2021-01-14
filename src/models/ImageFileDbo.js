const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports.create = async function(imageFile) {
  return await prisma.imagefile.create({
    data: {
      filePath: imageFile.filePath,
      title: imageFile.title,
      photoTakeDate: imageFile.photoTakenDate,
      description: imageFile.description,
    },
  });
};
