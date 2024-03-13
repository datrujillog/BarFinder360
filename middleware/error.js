//hacer una funcion que reciba un error y un request y un response


//y que devuelva un error
function errorMiddleware(error, req, res, next) {
  console.error(error);
  res.status(500).json({ message: "Error" });
}

export default errorMiddleware;