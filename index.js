import express from "express";
import morgan from "morgan";

//importar las rutas 
import Auth from "./routes/authRouter.js";
import User from "./routes/userRouter.js";


const port = 5001;

const app = express();

//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

//utilizar rutas
Auth(app);
User(app);





app.listen(port, () => {
  console.log("Server is running on port 3000");
});
