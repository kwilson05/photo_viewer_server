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
    this.#createdDate = imageFile.createdDate
  }

  get id()
  {
    return this.#id;
  }

  get filePath()
  {
    return this.#filePath;
  }

  get json()
  {
    return {
      id : this.#id,
      filePath: this.#filePath,
      title: this.#title,
      description: this.#description,
      photoTakenDate: this.#photoTakenDate,
      createdDate: this.#createdDate
    };
  }
}

module.exports = ImageFileDbo;
