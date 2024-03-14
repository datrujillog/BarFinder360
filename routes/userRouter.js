import express from "express";
import UserService from "../services/userService.js";
import authValidation from "../middleware/authValidation.js";



function userRouter(app) {
  const router = express.Router();

  const userServi = new UserService();

//   instanciar el servicio
  app.use("/api/users", router);


  router.get("/", authValidation,async (req, res, next) => {
    try {
      const body = req.body;
      const users = await userServi.getAllUsers(body);
      res.status(200).json({
        message: "User created",
        users,
      });
    } catch (error) {
      next(error);
    }
  });

  router.get("/:id", authValidation, async (req, res, next) => {
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