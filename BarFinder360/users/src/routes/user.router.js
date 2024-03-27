import express from "express";

import UserService from "../services/users.Service.js";
import { errorResponse } from "../helpers/response.js";

// const router = express.Router();

function userRouter(app) {
  const router = express.Router();

  // INSTANCIAMOS LA CLASE UserService
  const userServ = new UserService();

  app.use("/api/users", router);

  router.post("/create", async (req, res, next) => {
    const body = req.body;
    const response = await userServ.createUser(body);
    response.success
      ? res
        .status(201)
        .json({ message: "User created", user: response.results })
      : errorResponse(res, response.error);
  });

  router.get("/", async (req, res, next) => {
    const body = req.body;
    const response = await userServ.getAllUsers(body);
    if (!response.success)
      return res.status(404).json({ error: response.error });
    response.success
      ? res.status(200).json({ users: response.results })
      : errorResponse(res, response.error);
  });

  router.get("/One/:id", async (req, res, next) => {
    const userId = req.params.id;
    const response = await userServ.getUserById(userId);
    response.success
      ? res.status(200).json({ user: response.results })
      : errorResponse(res, response.error);
  });

  router.put("/update/:id", async (req, res, next) => {
    const userId = req.params.id;
    const body = req.body;
    const response = await userServ.updateUser(userId, body);
    response.success
      ? res
        .status(201)
        .json({ message: "User updated", user: response.results })
      : errorResponse(res, response.error);
  });

  router.delete("/delete/:id", async (req, res, next) => {
    const userId = req.params.id;
    const response = await userServ.deleteUser(userId);
    response.success
      ? res.status(200).json({ message: response.message })
      : errorResponse(res, response.error);
  });

  //! En desarrollo 
  router.post("/ByEmail", async (req, res, next) => {
    const body = req.body;
    const response = await userServ.getByEmail(body.email);
    response.success
      ? res.status(200).json({ success: true, message: "Business found", user: response.results })
      : res.status(404).json({ success: false, message: "Business not found", error: response.error });
  });
}

export default userRouter;
// : errorResponse(res, response.error);
// res.status(404).json({success: false, message: "Business not found", error: response.error});