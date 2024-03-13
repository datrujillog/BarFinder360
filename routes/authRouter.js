import express from "express";
import AuthService from "../services/authService.js";

function authRouter(app) {
  const router = express.Router();

  //instanciar el servicio
  const authServi = new AuthService();

  app.use("/api/auth", router);

  router.post("/login", async (req, res, next) => {
    try {
      const body = req.body;
      const users = await authServi.login(body);
      console.log(users);
      res.status(201).json({
        message: "login successful",
        users,
      });
    } catch (error) {
      next(error);
    }
  });

  router.post("/signup", async (req, res, next) => {
    try {
      const body = req.body;
      const users = await authServi.signup(body);
      console.log(users);
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

export default authRouter;
