const jwt = require("jsonwebtoken");
import config from "../config/config.js";

// const { forbidden} = require("../helpers/sendStatus");

function authValidation(req, res, next) {
  const bearer = req.headers.authorization;

  if (bearer && bearer.startsWith("Bearer")) {
    // const split = bearer.split("Bearer ")

    // const token = split[1]
    const [, token] = bearer.split("Bearer "); //Destructuring

    if (token) {
      try {
        const decoded = jwt.verify(token, jwtSecret);

        console.log(decoded);

        req.user = decoded;

        return next();
      } catch ({ message, name }) {
        // const message = error.message
        // const name = error.name
        return res.status(forbidden).json({
          error: true,
          message,
          type: name,
        });
      }
    }
  }

  return res.status(forbidden).json({
    error: true,
    message: "Insufficient permissions",
  });
}

function adminValidation(req, res, next) {
  if (req.user.role === "ADMIN") {
    return next();
  } else {
    return res.status(404).json({
      error: true,
      message: "Insufficient permissions",
    });
  }
}
function vendedorValidation(req, res, next) {
  if (req.user.role === "applicant") {
    return next();
  } else {
    return res.status(forbidden).json({
      error: true,
      message: "Insufficient permissions",
    });
  }
}
function boxValidation(req, res, next) {
  if (req.user.role === "employer") {
    return next();
  } else {
    return res.status(forbidden).json({
      error: true,
      message: "Insufficient permissions",
    });
  }
}
function coordinatorValidation(req, res, next) {
  if (req.user.role === "employer" || req.user.role === "admin") {
    return next();
  } else {
    return res.status(forbidden).json({
      error: true,
      message: "Insufficient permissions",
    });
  }
}

function authMiddleware(type) {
  let middlewares;
  if (type === "VENDEDOR") {
    middlewares = [authValidation, vendedorValidation];
  } else if (type === "COODINADOR") {
    middlewares = [authValidation, coordinatorValidation];
  } else if (type === "CAJA") {
    middlewares = [authValidation, boxValidation];
  } else if (type === "admin") {
    middlewares = [authValidation, adminValidation];
  } else {
    middlewares = [];
  }

  return middlewares;
}

module.exports = authMiddleware;





