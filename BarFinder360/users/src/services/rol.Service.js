import { PrismaClient } from "@prisma/client";

class RoleService {
  #client;
  constructor() {
    this.#client = new PrismaClient();
  }

  async createRole(body) {
    try {
      const results = await this.#client.role.create({
        data: {
          ...body,
        },
      });
      return { success: true, results };
    } catch (error) {
      return { success: false, error };
    }
  }
}

export default RoleService;