import express from "express";
import UserService from "../services/userService.js";

// const UserService = require("../services/userService");





function userRouter(app) {
  const router = express.Router();

  const userServi = new UserService();

//   instanciar el servicio

  app.use("/api/users", router);

  router.get("/", async (req, res, next) => {
    try {
      const body = req.body;
      const users = await userServi.getAllUsers(body);
      console.log(users);
      res.status(201).json({
        message: "User created",
        users,
      });
    } catch (error) {
      next(error);
    }
  });

  router.get("/:id", async (req, res, next) => {
    try {
      const userId = req.params.id;
      const users = await userServi.getUserById(userId);
      res.status(201).json({
        message: "User created",
        users,
      });
    } catch (error) {
      next(error);
    }
  });

  return router;
}


export default userRouter;