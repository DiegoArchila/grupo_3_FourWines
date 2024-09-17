//Tipos de Validaciones
export const ErroresTypes = {
  Required: "Required",
  MinLength: "MinLength",
  MaxLength: "MaxLength",
  Min: "Min",
  Max: "Max",
  Number: "Number",
};

export const ErroresTypesList = [
  ErroresTypes.Required,
  ErroresTypes.MinLength,
  ErroresTypes.MaxLength,
  ErroresTypes.Min,
  ErroresTypes.Max,
  ErroresTypes.Number,
];

/**
 * Validacion por tipo, retorna true si la validacion no se cumple
 *
 * @param {*} value valor a validar
 * @param {*} validationType tipo de validacion
 * @param {*} params parametros para la validacion de datos
 * @return {*}
 */

export const validationForType = (value, validationType, params = null) => {
  let booleanOutput = false;
  switch (validationType) {
    //Parametro requerido
    case ErroresTypes.Required:
      booleanOutput = value == "" || !value;
      break;

    //Longitud minima del string
    case ErroresTypes.MinLength:
      if (params.minLength) {
        booleanOutput = value.length < params.minLength;
      }
      break;

    //Longitud maxima del string
    case ErroresTypes.MaxLength:
      if (params.maxLength) {
        booleanOutput = value.length > params.maxLength;
      }
      break;

    //Valor minimo de un numero
    case ErroresTypes.Min:
      if (Number(value) != NaN && params.min) {
        booleanOutput = value < params.min;
      }
      break;

    //Valor maimo de un numero
    case ErroresTypes.Max:
      if (Number(value) != NaN && params.max) {
        booleanOutput = value > params.max;
      }
      break;

    case ErroresTypes.Number:
      booleanOutput = Number(value) == NaN;
      break;

    default:
      booleanOutput = false;
      break;
  }

  return booleanOutput;
};
