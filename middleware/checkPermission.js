import { permissions } from "./permissions.js";

// Middleware para verificar permisos
function checkPermission(resource, action, role) {
  return (req, res, next) => {
    if (permissions[role][resource][action]) {
      next();
    } else {
      res.status(403).send("No tienes permisos para realizar esta acción");
    }
  };


  
}

export { checkPermission };