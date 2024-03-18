import express, { response } from "express";
import AuthService from "../services/authService.js";
import { errorResponse, authResponse, Responsee } from "../helpers/response.js";
import { asyncHandler } from "../helpers/utils.js";
import { valitorUserSignup } from "../middleware/express-validator.js";
// import { checkPermission } from "../middleware/checkPermission.js";

function authRouter(app) {
  const router = express.Router();

  //instanciar el servicio
  const authServi = new AuthService();

  app.use("/api/auth", router);

  router.post("/login", async (req, res, next) => {
    const body = req.body;
    const response = await authServi.login(body);

    if (response.success) {
      res.cookie("token", response.token, {
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24), // 1 day
        secure: false,
      });
      authResponse(res, 201, true, "login successful", {
        payload: response.user,
        token: response.token,
      });
    } else {
      errorResponse(res, response.error);
    }
  });

  router.post("/signup", valitorUserSignup, async (req, res, next) => {
    const body = req.body;
    const response = await authServi.signup(body);

    if (response.success) {
      res.cookie("token", response.token, {
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24), // 1 day
        secure: false,
      });
      authResponse(res, 201, true, "login successful", {
        payload: response.user,
        token: response.token,
      });
    } else {
      errorResponse(res, response.error);
    }
  });

  return router;
}

export default authRouter;
