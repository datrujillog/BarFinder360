import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

import config from "../config/config.js";

class UserService {
  #client;
  constructor() {
    this.#client = new PrismaClient();
  }

//! REVISAR ESTE ENDPOINT SOBRE LA VALIDACION DEL TOKEN
  async getAllUsers() {
    try {
      const results = await this.#client.user.findMany();
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

  async updateUser(userId, body, token) {
    try {
      const userVerifique = await this.getUserById(userId);
      if (!userVerifique.success) throw new Error("User not found");

      const userToken = await this.#tokenVerify(token);
      if (userToken.results.id !== parseInt(userId)) throw new Error("You are not authorized to update this user");   

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
      let lasName = results.lastName;
      return {
        message: `El usuario ${name} ${lastName} ha sido actualizado correctamente.`,
        success: true,
        id,
      };
    } catch (error) {
      return { success: false, error };
    }
  }

  async deleteUser(userId,token) {
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
      let lasName = results.lastName;
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
