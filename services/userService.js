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
      return {
        count,
        results,
      };
    } catch (error) {
      throw error;
    }
  }

  async getUserById(id) {
    try {
      // validar que el usuario exia en la base de datos
      const results = await this.prisma.user.findUnique({
        where: {
          id: parseInt(id),
        },
      });
      return results;
    } catch (error) {
      throw error;
    }
  }

  async getByEmail(email) {
    try {
      const results = await this.prisma.user.findFirst({   //busca el primer usuario que cumpla con la condicion de email
        where: {
          email: email,
        },
      });
      return results;
    } catch (error) {
      throw error;
    }
  }
}

export default UserService;
