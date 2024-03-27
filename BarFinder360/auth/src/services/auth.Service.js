

// import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import axios from "axios";

import config from "../configs/config.js";






class AuthService {
  // #client;
  constructor() {
    // this.#prisma = client;
    // this.#client = new PrismaClient();
  }
//!  la funcion de login para que pueda iniciar secion tanto el negocio como el usuario
//! cambia la funcion  de la promesas a async y await ya que es redudante 
  async login(body) {
    try {
        const { email, password } = body;
        const {data} = await axios.post("http://localhost:5001/api/users/ByEmail", body)
        .then((res) => res)
        .catch((error) => error);
        
        if (data === undefined) throw new Error("Error usuario no encontrado");
              
        await this.#compare(password, data.user.password);
        const token = await this.crearToken({ email: data.user.email, id: data.user.id , role: data.user.RoleId, BusinessId: data.user.BusinessId});
        const { user } = data;
        return { success: true,  token };
    } catch (error) {
      return { success: false, error };
    }
  }

  async signup(data) {
    try {
      if (data.password) {
        data.password = await this.#encrypt(data.password);
      }
      const user = await axios.post("http://localhost:5001/api/users/business/create", data);
      delete user.data.user.password
      const token = await this.crearToken(user.data.user);
      return {
        success: true,
        data: user.data.user,
        token
      };
    } catch (error) {
      return { success: false, error };
    }
  }

  validate(token) {
    try {
      const data = jwt.verify(token, config.jwtSecret);
      delete data.iat;
      return {
        logged: true,
        success: true,
        data: data
      };

    } catch ({ message }) {
      return {
        logged: false,
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
