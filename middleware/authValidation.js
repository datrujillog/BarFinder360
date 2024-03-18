import jwt from "jsonwebtoken";
import config from "../config/config.js";


//!DEPRECATED FUNCTION NOT USED

function authValidation(req, res, next) {
  const bearer = req.headers.authorization;

  if (bearer && bearer.startsWith("Bearer")) {
    const [, token] = bearer.split("Bearer ");

    if (token) {
      try {
        const decoded = jwt.verify(token, config.jwtSecret);
        // console.log(decoded);
        req.user = decoded;
        return next();
      } catch (error) {
        if (error.name === "TokenExpiredError") {
          return res.status(401).json({
            error: true,
            message: "The token has expired.",
            type: "TokenExpiredError",
          });
        } else {
          return res.status(401).json({
            error: true,
            message: "Invalid Token.",
            type: error.name,
          });
        }
      }
    }
  }

  return res.status(401).json({
    error: true,
    message: "Authentication token not provided.",
  });
}

// export default authValidation;
