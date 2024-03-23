import express from "express";
import morgan from "morgan";

import  config  from "./configs/config.js";

//importaciones rutas
import User from "./routes/user.router.js";
import Role from "./routes/rol.router.js";
import Business from "./routes/business.Router.js";

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));


//use routes
User(app);
Role(app);
Business(app);

app.get("/health", (req, res) => {
  res.send("OK");
});


app.listen(config.port, () => {
  console.log("Server is running on port " + config.port);
  console.log("http://localhost:" + config.port );
});

