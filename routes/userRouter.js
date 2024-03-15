import express, { response } from "express";
import UserService from "../services/userService.js";
import authValidation from "../middleware/authValidation.js";
import { authResponse, errorResponse } from "../helpers/response.js";

function userRouter(app) {
  const router = express.Router();

  const userServi = new UserService();

  //   instanciar el servicio
  app.use("/api/users", router);

  router.get("/", authValidation, async (req, res, next) => {
      const body = req.body;
      const users = await userServi.getAllUsers(body);
      const token = req.headers.authorization.split(" ")[1];

      users.success
        ? authResponse(res, 201, true, "Users found successfully", {
            payload: users,
            token: token,
          })
        : errorResponse(res, users.error);
      
    
    
  });

  //! REVISAR ESTE ENDPOINT SOBRE LA VALIDACION DEL TOKEN
  router.get("/:id", authValidation, async (req, res, next) => {
    const userId = req.params.id;
    const response = await userServi.getUserById(userId);
    const token = req.headers.authorization.split(" ")[1];

    response.success
      ? authResponse(res, 201, true, "user found", {
          payload: response,
          token: token,
        })
      : errorResponse(res, response.error);
  });

  router.put("/:id", authValidation, async (req, res, next) => {
    const userId = req.params.id;
    const body = req.body;
    const token = req.headers.authorization.split(" ")[1];
    const response = await userServi.updateUser(userId, body, token);
    response.success
      ? authResponse(res, 201, true, "User ", {
          payload: response,
          token: token,
        })
      : errorResponse(res, response.error);
  });

  router.delete("/:id", authValidation, async (req, res, next) => {
    const userId = req.params.id;
    const token = req.headers.authorization.split(" ")[1];
    const response = await userServi.deleteUser(userId, token);
    response.success
      ? authResponse(res, 201, true, "User deleted", {
          payload: response,
          token: token,
        })
      : errorResponse(res, response.error);
  });

  return router;
}

export default userRouter;
