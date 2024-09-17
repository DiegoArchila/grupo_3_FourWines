/*IMPORTS*/
const { check }=require("express-validator");
const { findByEmail } =require("../models/users.js")
const settingGeneral = require("../databases/settingGeneralSite.json");
const index = require("../databases/index.json");
const { minibar } =require("../lib/complements.js");
const { validationResult } = require("express-validator");
const { uploadFile } = require("../lib/formats.js");
const { findEmail } = require("../services/users.services.js")

const validationsCreateUser=[
    check("firstName")
        .notEmpty().withMessage("Debes completar el campo \"Nombres\" ")
        .isLength({
            min:2,
            max:128
        }).withMessage("Los caracteres minimos y maximos en el campo \"Nombres\", son de 2 a 128"),
        
    check("lastName")
        .notEmpty().withMessage("Debes completar el campo \"Apellidos\" ")
        .isLength({
            min:2,
            max:128
        }).withMessage("Los caracteres minimos y maximos en el campo \"Apellidos\", son de 2 a 128"),
    
    check("dateBorn")
        .isDate().withMessage("Debes ingresar una fecha valida en \"Fecha nacimiento\" "),
    
    check("gender")
        .notEmpty().withMessage("Debes seleccionar un genero en \"Genero\" "),
        
    check("email")
        .isEmail().withMessage("Debes ingresar un email valido en \"Email\" ")
        .custom( async val => {

            if (await findEmail(val)){
                return true;
            } else {
                throw new Error("El email \'"+val+"\' ya se encuentra en uso");
            }
        }),
    check("country")
        .notEmpty().withMessage("Debes completar el campo \"País\" ")
        .isLength({
            min:2,
            max:128
        }).withMessage("Los caracteres minimos y maximos en el campo \"País\", son de 2 a 128"),

    check("province_state")
        .notEmpty().withMessage("Debes completar el campo \"Provincia/Estado\" ")
        .isLength({
            min:2,
            max:128
        }).withMessage("Los caracteres minimos y maximos en el campo \"Provincia/Estado\", son de 2 a 128"),
        
    check("city_town")
        .notEmpty().withMessage("Debes completar el campo \"Ciudad/Pueblo\" ")
        .isLength({
            min:2,
            max:128
        }).withMessage("Los caracteres minimos y maximos en el campo \"Ciudad/Pueblo\", son de 2 a 128"),

    check("address")
        .notEmpty().withMessage("Debes completar el campo \"Dirección\" ")
        .isLength({
            min:2,
            max:512
        }).withMessage("Los caracteres minimos y maximos en el campo \"Dirección\", son de 2 a 512"),

    check("password").notEmpty().withMessage("Debes completar el campo \"Contraseña\" ")
        .isLength({
            min:10,
            max:64
        }).withMessage("Los caracteres minimos y maximos en el campo \"Contraseña\", son de 10 a 64")
        .isStrongPassword({
            minLength:10,
            minUppercase:1,
            minNumbers:2
        }).withMessage("Se debe ingresar minimo: 10 caracteres, 1 letra mayuscula, 2 números. En el campo \"Contraseña\"."),
    check("passwordTry").custom((value, {req}) =>{
            if (value === req.body.password){
                return true;
            } else {
                throw new Error("Las contraseñas en los campos de Contraseña deben coincidir");
            }    
        }) 
];

const validateErrorscreateUser = async (req, res, next) => {

    const validations = validationResult(req);
    const errors=validationResult(req).array();
  
    if (errors[0]!=undefined) {
  
      return await res.render("createUser.ejs", {
        settingGeneral,
        index,
        minibar,
        errors: validations.mapped(),
        old: req.body,
      });
    } else {
        next();
    }
};

/**
 * Validate the fields for user authenticate 
 */
const checkLogin = [
    check("email", "Ingresa el email o contraseña").isEmail(),
    check("pwd", "Ingresa el email o contraseña").notEmpty()
];

/**
 * Validate the fields login
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
const validateCheckLogin = async (req, res, next) => {

    console.log("Body Middleware", req.body);
    
    const errors = validationResult(req);
    if( !errors.isEmpty() ){
        return await res.status(400).json(errors);
    }

    next();
}    


module.exports={
    validationsCreateUser,
    validateErrorscreateUser,
    checkLogin,
    validateCheckLogin,
    uploadFile
}