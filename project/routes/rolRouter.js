import express, { response } from "express";

import roleService from "../services/rolSevice.js";

import { authResponse, errorResponse } from "../helpers/response.js";

function userRouter(app) {
  const router = express.Router();

  const roleServi = new roleService();

  //   instanciar el servicio
  app.use("/api/role", router);

  router.post("/", async (req, res) => {
    try {
      const users = await roleServi.createRole(req.body);
      res.json({
        data: users,
        message: "Role created",
      });
    } catch (error) {
      errorResponse(res, error);
    }
  });

  router.get("/", async (req, res) => {
    try {
      const users = await roleServi.getRoles();
      res.json({
        data: users,
        message: "Roles listed",
      });
    } catch (error) {
      errorResponse(res, error);
    }
  });

  router.post("/accion", async (req, res) => {
    try {
      const users = await roleServi.createAccion(req.body);
      res.json({
        data: users,
        message: "accion created",
      });
    } catch (error) {
      errorResponse(res, error);
    }
  });

  router.post("/module", async (req, res) => {
    try {
      const users = await roleServi.createModule(req.body);
      res.json({
        data: users,
        message: "Module created",
      });
    } catch (error) {
      errorResponse(res, error);
    }
  });

  router.post("/permisos", async (req, res) => {
    try {
      const users = await roleServi.agregatePermisos(req.body);
      res.json({
        data: users,
        message: "Permisos created",
      });
    } catch (error) {
      errorResponse(res, error);
    }
  });

  router.get("/permisos/:id", async (req, res) => {
    try {
      const users = await roleServi.getPermisosByRolId(req.params.id);
      res.json({
        data: users,
        message: "Permisos created",
      });
    } catch (error) {
      errorResponse(res, error);
    }
  });
}

export default userRouter;
