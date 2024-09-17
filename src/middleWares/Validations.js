const { check } = require("express-validator");

/** @type {[string]}  -Tipos de validaciones */
const ValidationTypes = {
  notEmpty: "notEmpty",
  isLength: "isLength",
  isEmail: "isEmail",
  isInt: "isInt",
  isFloat: "isFloat",
};

/**
 * Permite realizar las validaciones de los campos segun las validaciones especificadas
 *
 * @param {*} validactions  -Validaciones segun el campo y el tipo de validacione. Ex: [["nombreCampo", ["notEmpty", ["isLength", { max: 50 }]]]]
 * @return {*} -Validaciones de los campos especificados
 */
const Validations = (validactions) => {
  let validateRegister = []; //Variable para todas las validaciones resultantes
  let names = new Map();
  let validationAux = null;
  let nombreCampo = null;
  let validacionesCampo = null;
  let formatoMensaje = null;

  for (let validation of validactions) {
    //Ciclo de los campos a validar
    nombreCampo = validation[0];
    validacionesCampo = validation[1];
    formatoMensaje = `El campo ${nombreCampo}`;

    validationAux = check(nombreCampo);

    for (const validationType of validacionesCampo) {
      //Ciclo para las validaciones del campo a validar
      if (validationType === ValidationTypes.notEmpty) {
        validationAux
          .notEmpty()
          .withMessage(`${formatoMensaje} no puede estar vacio.`)
          .bail();
      }
      if (validationType[0] === ValidationTypes.isLength) {
        validationAux
          .isLength(validationType[1])
          .withMessage(
            `${formatoMensaje} debe tener la siguiente cantidad de caracteres: ${
              validationType[1].min ? "Minimo = " + validationType[1].min : ""
            } ${
              validationType[1].max ? "Maximo = " + validationType[1].max : ""
            }.`
          );
      }
      if (validationType === ValidationTypes.isInt) {
        validationAux
          .isInt()
          .withMessage(`${formatoMensaje} debe ser un numero entero.`);
      } else if (validationType[0] === ValidationTypes.isInt) {
        validationAux
          .isInt(validationType[1])
          .withMessage(
            `${formatoMensaje} debe estar entre: ${
              validationType[1].min ? "Minimo = " + validationType[1].min : ""
            } ${
              validationType[1].max ? "Maximo = " + validationType[1].max : ""
            }.`
          );
      }
      if (validationType === ValidationTypes.isFloat) {
        validationAux
          .isFloat()
          .withMessage(`${formatoMensaje} debe ser un numero.`);
      } else if (validationType[0] === ValidationTypes.isFloat) {
        validationAux
          .isFloat(validationType[1])
          .withMessage(
            `${formatoMensaje} debe estar entre: ${
              validationType[1].min ? "Minimo = " + validationType[1].min : ""
            } ${
              validationType[1].max ? "Maximo = " + validationType[1].max : ""
            }.`
          );
      }
      if (validationType === ValidationTypes.isEmail) {
        validationAux
          .isEmail()
          .withMessage(`${formatoMensaje} debe ser un correo valido.`);
      }
    }
    names.set(validation[0], validationAux);
  }

  names.forEach((value, key, map) => {
    validateRegister.push(value);
  });

  return validateRegister;
};

module.exports = { ValidationTypes, Validations };
