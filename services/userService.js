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

  async updateUser(userId, body) {
    try {

      const userVerifique = await this.getUserById(userId);
      if (!userVerifique.success) throw new Error("User not found");

      const results = await this.prisma.user.update({
        where: {
          id: parseInt(userId),
        },
        data: {
          ...body,
        },
      });
      let id = results.id;
      let name = results.name;
      let lasName = results.lasName;
      return {
        message: `El usuario ${name} ${lasName} ha sido actualizado correctamente.`,
        success: true,
        id,
      };
    } catch (error) {
      return { success: false, error };
    }
  }

  async deleteUser(userId) {
    try {
      const results = await this.prisma.user.delete({
        where: {
          id: parseInt(userId),
        },
      });
      let id = results.id;
      let name = results.name;
      let lasName = results.lasName;
      return { 
        message: `El usuario ${name} ${lasName} ha sido eliminado correctamente.`,
        success: true,
        };
    } catch (error) {
      return { success: false, error };
    }
  }
}

export default UserService;
