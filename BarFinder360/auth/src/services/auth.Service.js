

import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import axios from "axios";

import config from "../configs/config.js";






class AuthService {
  #client;
  constructor() {
    // this.#prisma = client;
    this.#client = new PrismaClient();
  }

  async login(data) {
    try {
      const { email, password } = data;
      // const results = await this.#userService.getByEmail(email);

      //! configuracio de axios para hacer al microservicio de users
      // const results = await axios.get(`${config.usersUrl}/users/email/${email}`)
      //   .then((res) => res.data
      //   )
      //   .catch((error) => {
      //     console.error(error);
      //   });

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
      const user = await this.#client.user.create({ data });
      const token = await this.crearToken(user);
      return { success: true, user, token };
    } catch (error) {
      return { success: false, error };
    }
  }

  validate(token) {
    try {
      const data = jwt.verify(token, config.jwtSecret);
      return {
        success: true,
        data: data.results
      };

    } catch ({ message }) {
      return {
        success: false,
        message
      }

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
