
import RoleService from "../services/rol.Service.js";

const roleServ = new RoleService();

//! modificar la logica de la funcion
async function isUserAdmin(user) {
    try {
        const userRole = await roleServ.getRoleById(user)  ;
        if (userRole.results.name !== "ADMIN") {
            throw new Error("User is not an admin");
        }
        // Comprobar si el ID de negocio del usuario coincide con el de la solicitud
        //!El id de la solicitud de la request de la empresa que esta logeada
        // if (userRole.results.BusinessId !== "El id de la solicitud de la request de la empresa que esta logeada") {
        //     throw new Error("You are not authorized to create users");
        // }
        return { success: true, results: userRole.results};
    } catch (error) {
        throw new Error("Failed to check user admin status: " + error.message);
    }
}

export default isUserAdmin;
