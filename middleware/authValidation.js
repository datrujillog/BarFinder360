import jwt from "jsonwebtoken";
import config from "../config/config.js";

// const { 404} = require("../helpers/sendStatus");

function authValidation(req, res, next) {
  const bearer = req.headers.authorization;

  if (bearer && bearer.startsWith("Bearer")) {
    // const split = bearer.split("Bearer ")

    // const token = split[1]
    const [, token] = bearer.split("Bearer "); //Destructuring

    if (token) {
      try {
        const decoded = jwt.verify(token, config.jwtSecret);

        console.log(decoded);

        req.user = decoded;

        return next();
      } catch ({ message, name }) {
        // const message = error.message
        // const name = error.name
        return res.status(404).json({
          error: true,
          message,
          type: name,
        });
      }
    }
  }

  return res.status(404).json({
    error: true,
    message: "Insufficient permissions",
  });
}





export default authValidation;
