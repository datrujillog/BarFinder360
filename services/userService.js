import { PrismaClient } from "@prisma/client";

class UserService {
  constructor() {
    this.prisma = new PrismaClient();
  }

  async getAllUsers() {
    try {
      const results = await this.prisma.user.findMany();
      const count = await this.prisma.user.count();

      console.log(results);
      return { success: true, count, results };
    } catch (error) {
      return { success: false, error };
    }
  }

  async getUserById(id) {
    try {
      const results = await this.prisma.user.findUnique({
        where: {
          id: parseInt(id),
        },
      });
      return { success: true, results };
    } catch (error) {
      return { success: false, error };
    }
  }

  async getByEmail(email) {
    try {
      const results = await this.prisma.user.findFirst({
        //busca el primer usuario que cumpla con la condicion de email
        where: {
          email: email,
        },
      });
      if (!results) {
        const err = new Error("User not found");
        err.code = 404;
        throw err;
      }
      return { success: true, results };
    } catch (error) {
      return { success: false, error };
    }
  }
}

export default UserService;
