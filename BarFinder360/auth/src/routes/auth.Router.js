import express, { response } from "express";
import AuthService from "../services/auth.Service.js";
import { errorResponse, authResponse, Responsee } from "../helpers/response.js";
// import { asyncHandler } from "../helpers/utils.js";
import { valitorUserSignup } from "../middleware/express-validator.js";
// import auth from "../middleware/auth.js";
// import { checkPermission } from "../middleware/checkPermission.js";

function authRouter(app) {
  const router = express.Router();

  //instanciar el servicio
  const authServ = new AuthService();

  app.use("/api/auth", router);

  router.post("/login", async (req, res, next) => {
    const body = req.body;
    const response = await authServ.login(body);

    response.success
      ? res.cookie("token", response.token, {
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24), // 1 day
        secure: false,
      }) &&
      authResponse(res, 201, true, "signup successful", {
        payload: response.user,
        token: response.token,
      })
      : errorResponse(res, response.error);

  });

  router.post("/signup", valitorUserSignup, async (req, res, next) => {
    const body = req.body;
    const response = await authServ.signup(body);

    response.success
      ? res.cookie("token", response.token, {
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24), // 1 day
        secure: false,
      }) &&
      authResponse(res, 201, true, "signup successful", {
        payload: response.user,
        token: response.token,
      })
      : errorResponse(res, response.error);
  });

  router.post("/validate", (req, res, next) => {
    // const token = req.cookies.token;
    const { token } = req.body;
    const response = authServi.validate(token);

    response.success
      ? authResponse(res, 201, true, "token is valid",{
        payload: response.data,
        token: token
      })
      : errorResponse(res, response.message);

  });

  return router;
}

export default authRouter;
