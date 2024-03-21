import express from "express";

import RoleService from "../services/rol.Service.js";
import { errorResponse } from "../helpers/response.js";

// const router = express.Router();

function userRouter(app) {
  const router = express.Router();

  // INSTANCIAMOS LA CLASE UserService
  const roleServ = new RoleService();

  app.use("/api/users/role", router);

  

  router.post("/create", async (req, res, next) => {
    const body = req.body;
    const response = await roleServ.createRole(body);
    response.success
      ? res.status(201).json({ message: "Role created", user: response.results })
      : errorResponse(res, response.error);
  });
}

export default userRouter;
 