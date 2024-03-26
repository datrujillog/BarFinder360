import express from "express";

import BusinessService from "../services/business.Service.js";
import { errorResponse } from "../helpers/response.js";

// const router = express.Router();

function businessRouter(app) {
  const router = express.Router();

  // INSTANCIAMOS LA CLASE UserService
  const businessServ = new BusinessService();

  app.use("/api/users/business", router);

  // ! se crea desde el micdroservisi de auth con signup
  router.post("/create", async (req, res, next) => {
    const body = req.body;
    const response = await businessServ.createBusiness(body);
    response.success
      ? res.status(201).json({ message: "Business created", user: response.results })
      : errorResponse(res, response.error);
  });


  router.get("/userBusiness/:id", async (req, res, next) => {
    // const body = req.body;
    const businessId = req.params.id;
    const response = await businessServ.userBusiness(businessId);
    response.success
      ? res.status(201).json({ message: "Business users", user: response.results })
      : errorResponse(res, response.error);
  });
}

export default businessRouter;
