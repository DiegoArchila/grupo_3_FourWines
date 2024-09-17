/*IMPORTS*/
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const { resolve } = require("path");
const { rejects } = require("assert");
const jwt = require("jsonwebtoken");
const multer = require('multer');

/**Format the numbers to format currency,
 * this to COP=Colombian PESO Money
 * 
 */
const toCOP= new Intl.NumberFormat("es-CO", {
    style:"currency",
    currency:"COP",
    minimumFractionDigits:0
});

/**
 * Convert JSON in Object
 * @param {JSON} json Object in format JSON 
 * @returns A Object at format Object
 */
const toObject = (json) =>{
    return JSON.parse( fs.readFileSync(path.resolve(__dirname,json), "utf-8") );
}

/**
 * Create a file type JSON
 * @param {Object} Obj Object to convert
 * @param {String} path Path of the file name to create 
 */
const createJSON = (Obj, pathRoute) =>{
    fs.writeFileSync(path.resolve(__dirname,pathRoute), JSON.stringify(Obj, null, " "));
}

/**
 * Encrypt passwords
 * @param {String} pwd text of the password to encrypt
 * @returns password encrypted
 */
const encrypt = (pwd) => {
    let salt=12;
    return bcrypt.hashSync(pwd,salt);
}

/**
 * Compared encrypt passwords with password text
 * @param {*} pwd text of the password to compare
 * @returns true if the comparation is true, or false if don't
 */
const comparePassword = (pwd, pwdEncrypted) => {
    return bcrypt.compareSync(pwd,pwdEncrypted);
}

/**
 * Settings of multer
 */
 const optStorage = multer.diskStorage({
    destination: function(req, file, cllbk) {
        cllbk(null, path.resolve(__dirname, "../../public/img/profile"));
    },
    filename: function(req, file, cllbk) {
        cllbk(null, `${Date.now()}${path.extname(file.originalname)}`);
    }
});

/**
 * Function to uploadFile
 */
const uploadFile=multer({ storage:optStorage });

/**
 * Generate Token with jsonwebtoken
 * @param {*} uid 
 * @returns Promise: Token or error
 */
const createJWT = (uid) => {
    return new Promise((resolve, reject) => {

        const payload={uid};
        
        jwt.sign(payload, process.env.JWT_KEY, {
            // algorithm: "RS512",
            expiresIn: "1d"
        }, ((err, token) => {
            if(err){
                console.log("Se ha generado un error al intentar generar token:\n", err);
                reject("Se ha generado un error al intentar generar token:\n"+ err);
            }else {
                resolve(token);
            }
        }))

    })
}

/**
 * Validate JSON
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @returns JSON with Response HTTP[S]
 */
const verifyJWT= (req,res,next)=>{
    let token=req.headers["Auth"];
    if(!token) {
        res.status(401).json({
            error:"Token no valido, expirado, o incorrecto"
        });
    }

    console.log("Token decodificado", jwt.decode(token));
    
    jwt.verify(token,process.env.JWT_KEY,(err, userId) => {
        if(err){
            res.status(401).json({
                error:"Token no valido, expirado, o incorrecto"
            });
        } else {
            next();
        }
    })
}


module.exports={
    toCOP,
    toObject,
    createJSON,
    encrypt,
    comparePassword,
    createJWT,
    verifyJWT,
    uploadFile
}