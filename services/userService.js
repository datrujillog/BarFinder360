import { PrismaClient } from "@prisma/client";

class UserService {
  constructor() {
    this.prisma = new PrismaClient();
  }

  async getAllUsers() {
    try {
      const users = await this.prisma.user.findMany();
      return users;
    } catch (error) {
      throw error;
    }
  }
}

export default UserService;
