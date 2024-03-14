import { body } from "express-validator";
import  {validateField}  from "./validateField.js";

export const valitorUserSignup = [
    body("name").notEmpty().withMessage("Name is required")
                .isString().withMessage("Name must be a string")
                .custom((value) => {
                    if (value.length < 3) {
                        throw new Error("Name must be at least 3 characters long");
                    }
                    return true;
                })
                .custom(value => {
                    // Verificar si contiene números o caracteres especiales
                    if (/[\d!@#$%^&*(),.?":{}|<>]/.test(value)) {
                      throw new Error('El campo "name" no puede contener números ni caracteres especiales.');
                    }
                    return true;
                }),

    body("lasName").notEmpty().withMessage("Name is required")
                    .isString().withMessage("Name must be a string")
                    .custom((value) => {
                            if (value.length < 3) {
                                throw new Error("Name must be at least 3 characters long");
                            }
                                return true;
                            })
                    .custom(value => {
                            // Verificar si contiene números o caracteres especiales
                            if (/[\d!@#$%^&*(),.?":{}|<>]/.test(value)) {
                            throw new Error('El campo "name" no puede contener números ni caracteres especiales.');
                            }
                            return true;
                }),

    body("usuario").notEmpty().withMessage("Usuario is required"),

    body("email").notEmpty().withMessage("Email is required") 
                .isEmail().withMessage("Email must be a valid email"), 

                body('password')
                .notEmpty().withMessage('El campo "password" es requerido.')
                .isLength({ min: 6 }).withMessage('El campo "password" debe tener al menos 6 caracteres.')
                .custom(value => {
                  // Verificar si contiene al menos una letra mayúscula
                  if (!/[A-Z]/.test(value)) {
                    throw new Error('El campo "password" debe contener al menos una letra mayúscula.');
                  }
                  // Verificar si contiene al menos una letra minúscula
                  if (!/[a-z]/.test(value)) {
                    throw new Error('El campo "password" debe contener al menos una letra minúscula.');
                  }
                  // Verificar si contiene al menos un número
                  if (!/\d/.test(value)) {
                    throw new Error('El campo "password" debe contener al menos un número.');
                  }
                  // Verificar si contiene al menos un carácter especial
                  if (!/[\W_]/.test(value)) {
                    throw new Error('El campo "password" debe contener al menos un carácter especial.');
                  }
                  return true;
                }),
    body("phone").notEmpty().withMessage("Phone is required"),

    body("NameBusiness").notEmpty().withMessage("NameBusiness is required"),

    body("tipoNegocio").notEmpty().withMessage("NameBusiness is required"),

        validateField,
];


