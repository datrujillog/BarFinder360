import { PrismaClient } from "@prisma/client";
import RoleService from "./rol.Service.js";
import randomCode from "../helpers/randomCode.js";

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
      const randon = await randomCode();
      const results = await this.#client.business.create({
        data: {
          code: randon, //await randomCode(),
          ...body,
          Role: {
            connect: {
              id: defailRole,
            },
          },
        },
      });

      //ACTULIZAR LA TABLA DE ROLES CON EL ID DE BUSINESS
      await this.#roleServ.updateRole({ id: defailRole, BusinessId: results.id });

      return { success: true, results };
    } catch (error) {
      return { success: false, error };
    }
  }

  //! VALIDAR ESTE METODO
  async getBusinessById(id) {
    try {
      const results = await this.#client.business.findUnique({
        where: {
          id: parseInt(id),
        },
      });
      if (!results) {
        const err = new Error("Business not found");
        err.code = 404;
        throw err;
      }
      return { success: true, results };
    } catch (error) {
      return { success: false, error };
    }
  }
}

export default BusinessService;
