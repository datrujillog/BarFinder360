import { PrismaClient } from "@prisma/client";



class RoleService {
  #client;
  constructor() {
    this.#client = new PrismaClient();
  }

  //!Cuando se crea mas roles  se debe de crear en el mismo campo QUe el rol administrador
  //! EL id de BusinessId se debe de ser de la empresa que se esta creando el rol
  async createRole(body) {
    try {
      const results = await this.#client.role.create({
        data: {
          ...body,
          // Business: {
          //   connect: {
          //     id: body.Business.connect.id,
          //   },
          // },
        },
      });
      return { success: true, results };
    } catch (error) {
      return { success: false, error }; 
    }
  }

  async getRoleById(id) {
    try {
      const results = await this.#client.role.findUnique({
        where: {
          id: parseInt(id),
        },
      });
      if (!results) {
        const err = new Error("Role not found");
        err.code = 404;
        throw err;
      }
      return { success: true, results };
    } catch (error) {
      return { success: false, error };
    }
  }

  async updateRole(body) {
    try {
      const results = await this.#client.role.update({
        where: {
          id: body.id,
        },
        data: {
          BusinessId: body.BusinessId,
        },
      });
      return { success: true, results };
    } catch (error) {
      return { success: false, error };
    }
  }

 
}

export default RoleService;
