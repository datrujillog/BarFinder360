import { PrismaClient } from "@prisma/client";
import UserService from "./userService.js";

class roleService {
  #client;
  constructor() {
    this.#client = new PrismaClient();
    this.userServi = new UserService();
  }

  createRole = async (data) => {
    try {
      const role = await this.#client.rol.create({
        data: {
          name: data.name,
        },
      });
      return role;
    } catch (error) {
      throw error;
    }
  };

  getRoles = async () => {
    try {
      const roles = await this.#client.rol.findMany();
      return roles;
    } catch (error) {
      throw error;
    }
  };

  createAccion = async (data) => {
    try {
      const accion = await this.#client.accion.create({
        data: {
          name: data.name,
        },
      });
      return accion;
    } catch (error) {
      throw error;
    }
  };

  createModule = async (data) => {
    try {
      const module = await this.#client.modulo.create({
        data: {
          name: data.name,
        },
      });
      return module;
    } catch (error) {
      throw error;
    }
  };

  // crear un servicio para agregar el rol al user y agregar el modulo  y la accion  ala tabla de AccionHasModule
  async agregatePermisos(data) {
    try {
      // const user = await this.#client.user.update({
      //     where: {
      //         id: data.userId,
      //     },
      //     data: {
      //         roles: {
      //             connect: {
      //                 id: data.rolId,
      //             },
      //         },
      //     },
      // });

      // const userById = await this.userServi.getUserById(data.userId);

      // const result = userById.results;

      // crer la tabla de accionHasModule con los siguientes datos campos accionId,moduloId,rolId
      const user = await this.#client.accionHasModule.create({
        data: {
          accion: {
            connect: { id: data.accionId },
          },
          modulo: {
            connect: { id: data.moduleId },
          },
          rol: {
            connect: { id: data.rolId },
          },
        },
      });

      return {
        user,
      };
    } catch (error) {
      throw error;
    }
  }

  async getPermisosByRolId(rolId) {
    try {
        const permisos = await this.#client.accionHasModule.findMany({
            where: {
              rolId: parseInt(rolId),
            },
            select: {
              rol: { select: { name: true }, },
              modulo: { select: { name: true } },
              accion: { select: { name: true } },
              // Incluye los datos del usuario a través de la relación con Rol
              rol: {
                select: {
                    user: { select: { name: true, lastName: true, email: true } }
                  }
              }
            },
          });
          
         
      return permisos;
    } catch (error) {
      throw error;
    }
  }
}

export default roleService;
