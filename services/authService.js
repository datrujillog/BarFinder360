import { PrismaClient } from "@prisma/client";



class AuthService {
  constructor() {
    this.prisma = new PrismaClient();

    
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