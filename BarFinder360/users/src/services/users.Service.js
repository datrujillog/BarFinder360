import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

import BusinessService from "./business.Service.js";
import RoleService from "./rol.Service.js";

import config from "../configs/config.js";
import isUserAdmin from "../helpers/isUserAdmin.js";

isUserAdmin;
class UserService {
  #client;
  #businessServ;
  #roleServ;
  constructor() {
    this.#client = new PrismaClient();
    this.#businessServ = new BusinessService();
    this.#roleServ = new RoleService();
  }


  //! falta validar que exsta el rol
  async createUser(body) {
    try {
      //!se supone que este BusinessId de negocio se obtiene de la request
      const BusinessId = body.Business.connect.id;

      // const userRo = await isUserAdmin(body.Role.connect.id);
      // if (!userRo.success) throw new Error("Only admins can create users");

      const businessGet = await this.#businessServ.getBusinessById(BusinessId);
      if (!businessGet.success) throw new Error("Business not found");

      //! para crear al usuario se necesita el id del negocio al que pertenece el id de negocio se obtiene de la request
      const results = await this.#client.user.create({
        data: {
          ...body,
          Business: {
            connect: {
              id: parseInt(body.Business.connect.id),
            },
          },
          Role: {
            connect: {
              id: parseInt(body.Role.connect.id),
            },
          },
        },
      });
      return { success: true, results };
    } catch (error) {
      if (error.code === "P2025") error.message = "User not found";
      return { success: false, error };
    }
  }

  async getAllUsers() {
    try {
      const results = await this.#client.user.findMany({
       include: {
          Business: true,
          Role: true,
        },
      });     
        
      
      const count = await this.#client.user.count();
      return { success: true, count, results };
    } catch (error) {
      return { success: false, error };
    }
  }

  async getUserById(id) {
    try {
      const results = await this.#client.user.findUnique({
        where: {
          id: parseInt(id),
        },
        include: {
          Business: true,
          Role: true,
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

      


      const results = await this.#client.user.findFirst({
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
  //metodo para estraer el token de la request
  async #tokenVerify(token) {
    try {
      const { results } = jwt.verify(token, config.jwtSecret);
      return { success: true, results };
    } catch (error) {
      return { success: false, error };
    }
  }

  async updateUser(userId, body) {
    try {
      const userVerifique = await this.getUserById(userId);
      if (!userVerifique.success) throw new Error("User not found");

      // const userToken = await this.#tokenVerify(token);
      // if (userToken.results.id !== parseInt(userId)) throw new Error("You are not authorized to update this user");

      const results = await this.#client.user.update({
        where: {
          id: parseInt(userId),
        },
        data: {
          ...body,
        },
      });
      let id = results.id;
      let name = results.name;
      let lastName = results.lastName;
      return {
        message: `El usuario ${name} ${lastName} ha sido actualizado correctamente.`,
        success: true,
        id,
      };
    } catch (error) {
      return { success: false, error };
    }
  }

  async deleteUser(userId) {
    try {
      const userVerifique = await this.getUserById(userId);
      if (!userVerifique.success) throw new Error("User not found");

      // const userToken = await this.#tokenVerify(token);
      // if (userToken.results.id !== parseInt(userId)) throw new Error("You are not authorized to update this user");

      const results = await this.#client.user.delete({
        where: {
          id: parseInt(userId),
        },
      });
      let id = results.id;
      let name = results.name;
      let lastName = results.lastName;
      return {
        message: `El usuario ${name} ${lastName} ha sido eliminado correctamente.`,
        success: true,
      };
    } catch (error) {
      return { success: false, error };
    }
  }
}

export default UserService;
