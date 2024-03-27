import { request, response } from "express";
import { validationResult } from "express-validator";
import {responseMessage} from "../helpers/messagesHelper.js";

export const validateField = (req = request, res = response, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const response = responseMessage(false, 400, errors);
    return res.status(400).json(response);
  }
  next();
};