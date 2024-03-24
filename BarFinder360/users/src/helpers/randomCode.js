'use strict';


//hacer funcion para generar codigo aleatoriode 6 digitos que los rtres
async function randomCode() {
  //generar codigo aleatorio
  return Math.random().toString(36).substr(2, 6);
}

export default randomCode;

// console.log(randomCode());
