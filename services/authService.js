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

      const user = await this.userService.getByEmail(data.email);

      await this.#compare(password, user.password);


      return user;
    } catch (error) {
      throw error;
    }
  }

  async signup(data) {
    if (data.password) {
      data.password = await this.#encrypt(data.password);
    }
    const user = await this.prisma.user.create({ data });
    return user;
  }

  async crearToken(data) {
    const token = jwt.sign(payload, config.jwtSecret, {
      expiresIn: "7d",
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
