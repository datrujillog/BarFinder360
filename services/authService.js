import { PrismaClient } from "@prisma/client";
import UserService from "./userService.js";



class AuthService {
  constructor() {
    this.prisma = new PrismaClient();
    this.userService = new UserService();

    
  }

  async login (data) {
    try {
      const user = await this.userService.getByEmail(data.email);
    
      if (user.password !== data.password) {
        throw new Error("Invalid password");
      }
      return user;
      
    } catch (error) {
      throw error;
    }
  }

  async signup (data) {
    try {
      const user = await this.prisma.user.create({
        data: {
          nombre: data.nombre,
          apellido: data.apellido,
          usuario: data.usuario,
          email: data.email,
          password: data.password,
          telefono: data.telefono,
          NombreNegocio: data.NombreNegocio,
          tipoNegocio: data.tipoNegocio,
          rol: data.rol,
          estado: data.estado,
        },
      });
      return user;
    } catch (error) {
      throw error;
    }  
    
  }


}

export default AuthService;