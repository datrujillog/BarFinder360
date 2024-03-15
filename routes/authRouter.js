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
    response.success
      ? authResponse(res, 201, true, "login successful", {
          payload: response.user,
          token: response.token,
        })
      : errorResponse(res, response.error);
  });

  router.post("/signup", valitorUserSignup, async (req, res, next) => {
    const body = req.body;
    const response = await authServi.signup(body);
    response.success
      ? Responsee(res, 201, true, "signup successful", {
          payload: response.user,
          token: response.token,
        })
      : errorResponse(res, response.error);
  });

  return router;
}

export default authRouter;
