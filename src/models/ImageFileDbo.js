const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class ImageFileDbo {

  #id;
  #filePath;
  #title;
  #photoTakeDate;
  #description;

  constructor(id, filePath, title, photoTakeDate, description) {
    this.#id = id;
    this.#filePath = filePath;
    this.#title = title;
    this.#photoTakeDate = photoTakeDate;
    this.#description = description;
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
      photoTakenDate: this.#photoTakeDate
    };
  }
}

module.exports = ImageFileDbo;
