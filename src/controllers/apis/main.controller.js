const db = require('../../database/models');
const { createJWT } = require('../../lib/formats.js');
const { createUser } = require("../../services/users.services.js");

const mainController = {};

/**
 * Authenticate users
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @returns JSON with Response HTTP[S]
 */
mainController.login= async (req,res) => {

    const { email, pwd } = req.body;

    try {

        // The user Exists?
        let user = await db.User.findOne({
            include: [{
                model:db.UserEmail,
                as: "emails",
                where:{
                    "email":email
                },
                // include: [{
                //     model:db.EmailCategory,
                //     as: "category",
                //     attributes:["category"]
                // }],
                attributes : ["email"]       
            }],
            attributes:["pwd","isAdmin","firstName","imagen"]
        });

        console.log("User Emails")

        //Validating credentials, and if is admin or not
        if(user && (user.validPwd(pwd))) {

            //Gernerate token JWT
            const token= await createJWT(user.id);

            //Assing information from the user
            const userJSON={
                "name":user.firstName,
                "imagen":user.imagen,
                "isAdmin": user.isAdmin,
                "auth":token
            };
            
            //Assign Token To headers
            res.setHeader("Auth",token);

            return res.status(200).json(userJSON);

        } else {
            return res.status(400).json({
                errors:"Usuario o contraseña incorrecta"
            });
        }
    
    } catch (error) {
        console.log("Error", error);
        return res.status(500).json({
            description: "Comuniquese con el Administrador (Internal Error 500)"
        });
    }

}

/**
 * Create user
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @returns JSON with Response HTTP[S]
 */
mainController.createUser= async (req, res) =>{

    const isOk = await createUser(req.body, req.file);

    if(isOk!=undefined){
        return res.status(201).json({
            created : isOk._options.isNewRecord
        });
    }else{
        return res.status(400).json({
            created : false
        });
    }
}

module.exports=mainController;