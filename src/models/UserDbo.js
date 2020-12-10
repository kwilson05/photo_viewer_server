const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class User {
  static async create(user) {
    return await prisma.user.create({
      data: {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        password: user.password,
      },
    });
  }

  static async findByEmail(email) {
    return await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  }
}

module.exports = User;
