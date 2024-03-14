import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { PrismaClient } from "@prisma/client";
import UserService from "./userService.js";
import config from "../config/config.js";

class AuthService {
  constructor() {
    this.prisma = new PrismaClient();
    this.userService = new UserService();
  }

  async login(data) {
    try {
      const { email, password } = data;
      const results = await this.userService.getByEmail(email);

      if (!results.success) {
        throw results.error;
      }
      await this.#compare(password, results.results.password);
      const token = await this.crearToken(results);
      const user = results.results;
      return { success: true, user, token };
    } catch (error) {
      return { success: false, error };
    }
  }

  async signup(data) {
    try {
      if (data.password) {
        data.password = await this.#encrypt(data.password);
      }
      const user = await this.prisma.user.create({ data });
      return { success: true, user };
    } catch (error) {
      return { success: false, error };
    }
  }

  async crearToken(payload) {
    const token = jwt.sign(payload, config.jwtSecret, {
      //que el token se vensa en un minuto // 1m
      // expiresIn: "1m",
      expiresIn: "1d",
    });
    return token;
  }

  async #encrypt(string) {
    try {
      const salt = await bcrypt.genSalt();
      const hash = await bcrypt.hash(string, salt);

      return hash;
    } catch (error) {
      console.log(error);
    }
  }

  async #compare(string, hash) {
    const match = await bcrypt.compare(string, hash);
    if (!match) {
      throw new Error("Invalid password");
    }
    return match;
  }
}

export default AuthService;
