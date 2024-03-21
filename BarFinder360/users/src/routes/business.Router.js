import express from "express";

import BusinessService from "../services/business.Service.js";
import { errorResponse } from "../helpers/response.js";

// const router = express.Router();

function businessRouter(app) {
  const router = express.Router();

  // INSTANCIAMOS LA CLASE UserService
  const businessServ = new BusinessService();

  app.use("/api/users/business", router);
  

  router.post("/create", async (req, res, next) => {
    const body = req.body;
    const response = await businessServ.createBusiness(body);
    response.success
      ? res.status(201).json({ message: "Business created", user: response.results })
      : errorResponse(res, response.error);
  });
}

export default businessRouter;
