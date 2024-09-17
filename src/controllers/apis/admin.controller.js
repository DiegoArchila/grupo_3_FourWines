const { createJWT } = require('../../lib/formats.js');
const db =require("../../database/models");

const admin = {};

/**
 * Validate User Login
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 */
admin.login=async (req,res) =>{

    const users= await db.User.findAll({
        include : ["genders"]
    });

    res.status(200).json({
        info: users
})

}

module.exports= admin;