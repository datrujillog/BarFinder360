import express from "express";
import morgan from "morgan";

import  config  from "./configs/config.js";

//importaciones rutas
import router from "./routes/user.rourte.js";

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));


//use routes
app.use("/users", router);


app.listen(config.port, () => {
  console.log("Server is running on port " + config.port);
  console.log("http://localhost:" + config.port );
});

