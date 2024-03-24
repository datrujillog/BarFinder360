import { PrismaClient } from "@prisma/client";
import RoleService from "./rol.Service.js";

class BusinessService {
  #client;
  #roleServ;
  constructor() {
    this.#client = new PrismaClient();
    this.#roleServ = new RoleService();
  }

  async createBusiness(body) {
    try {
      const role = await this.#roleServ.createRole({ name: "ADMIN" });
      const defailRole = role.results.id;
      const results = await this.#client.business.create({
        data: {
          ...body,
          User: {
            create: {
              name: body.name,
              lastName: body.lastName,
              email: body.email,
              password: body.password,
              phone: body.phone,
              Role: {
                connect: {
                  id: defailRole,
                },
              },
            },
          },
        },
      });
      return { success: true, results };
    } catch (error) {
      return { success: false, error };
    }
  }
}

export default BusinessService;
