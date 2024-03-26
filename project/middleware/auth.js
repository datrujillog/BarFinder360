import jwt from "jsonwebtoken";
import config from "../config/config.js";

function auth(req, res, next) {
  const token = req.cookies.token;

  try {
    if (!token) {
      throw new Error("Authentication token not provided.");
    }
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded.results;
    next();
  } catch (error) {
    console.error(error);
    return res.status(403).json({
      error: true,
      msg: error.message,
      message: "Insufficient permissions.",
    });
  }
}

export default auth;
