import express from "express";
import morgan from "morgan";

import  config  from "./src/configs/config.js";

//importaciones rutas
import router from "./src/routes/user.rourte.js";

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));

app.listen(config.port, () => {
  console.log("Server is running on port " + config.port);
  console.log("http://localhost:" + config.port + "/api/");
});

