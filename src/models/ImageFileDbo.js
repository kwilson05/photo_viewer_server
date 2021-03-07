const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class ImageFileDbo {

  #id;
  #filePath;
  #title;
  #photoTakenDate;
  #description;
  #createdDate;

  constructor(imageFile) {

    this.#id = imageFile.id;
    this.#filePath = imageFile.filePath;
    this.#title = imageFile.title;
    this.#photoTakenDate = imageFile.photoTakenDate;
    this.#description = imageFile.description;
    this.#createdDate = imageFile.createdDate;
  }

  get id()
  {
    return this.#id;
  }

  get filePath()
  {
    return this.#filePath;
  }

  set description(description)
  {
    this.#description = description;
  }

  set photoTakenDate(photoTakenDate)
  {
    this.#photoTakenDate = photoTakenDate;
  }

  set title(title)
  {
    this.#title = title;
  }

  get json()
  {
    return {
      id : this.#id,
      filePath: this.#filePath,
      title: this.#title,
      description: this.#description,
      photoTakenDate: this.#photoTakenDate.toISOString().slice(0, -1),
      createdDate: this.#createdDate.toISOString().slice(0, -1),
    };
  }
  save()
  {
    return prisma.imagefile.update({
      where:{
        id: this.#id,
      },
      data:{
      title: this.#title,
      description: this.#description,
      photoTakenDate: this.#photoTakenDate,
      }
    });
  }
  delete()
  {
      return prisma.imagefile.delete({
        where: {
          id: this.#id,
        }
      })
  }

}

module.exports = ImageFileDbo;
