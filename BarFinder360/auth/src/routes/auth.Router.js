import express, { response } from "express";

import AuthService from "../services/auth.Service.js";

import { errorResponse, authResponse,Responsee} from "../helpers/response.js";
import { valitorUserSignup } from "../middleware/express-validator.js";


function authRouter(app) {
  const router = express.Router();

  //instanciar el servicio
  const authServ = new AuthService();

  app.use("/api/auth", router);

  // ! falta que el negocio tambien pueda iniciar secion ya que solamene puede iniciar seccion los usuarios 
  router.post("/login", async (req, res, next) => {
    const body = req.body;
    const response = await authServ.login(body);
    response.success
      ? res.cookie("token", response.token, { 
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24), // 1 day
        secure: false,
      }) &&
      authResponse(res, 201, true, "login successful", {
        payload: response.user,
        token: response.token,
      })
      : errorResponse(res, response.error);
  });

  router.post("/signup",async (req, res, next) => {
    const body = req.body;
    const response = await authServ.signup(body);

    response.success
      ? res.cookie("token", response.token, {
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24), // 1 day
        secure: false,
      }) &&
      authResponse(res, 201, true, "signup successful", {
        payload: response.data,
        token: response.token,
      })
      : errorResponse(res, response.error);
  });

  router.post("/validate", (req, res, next) => {
    // const token = req.cookies.token;
    const { token } = req.body;
    const response = authServ.validate(token);

    response.success
      ? Responsee(res, 201, true, "token is valid",{
        payload: response.data
      })
      : errorResponse(res, response.message);

  });

  return router;
}

export default authRouter;
