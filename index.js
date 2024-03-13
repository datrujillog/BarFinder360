import express from "express";
import morgan from "morgan";

//importar las rutas 
import Auth from "./routes/authRouter.js";
import User from "./routes/userRouter.js";
import e from "express";


const port = 5001;

const app = express();

//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

//utilizar rutas
Auth(app);
User(app);

//middleware de errores
app.use((error, req, res, next) => {
  console.error(error.message);
 res.status(500).json({ message:  error.message || error });

});



//levantar el servidor




app.listen(port, () => {
  console.log("Server is running on port 3000");
});
