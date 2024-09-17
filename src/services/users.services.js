const { Op } = require("sequelize");
const db = require("../database/models");

const userServices = {};

/**
 * Find Email
 * @param {String} email
 * @returns {Boolean} true if not exists, false or not
 */
userServices.findEmail= async (email) => {
    const foundEmail = await db.UserEmail.findOne({
        where : {
            email : {
                [Op.eq]: email
             }
         
        },
        attributes : ["email"]
    })
  
   return (foundEmail==null) ? true:false;
};

/**
 * Create new User
 * @param {Body} body the request http
 * @returns Response http 
 */
userServices.createUser=async(newUser, photo) =>{

    try {
        
        //Create data table User
        const isCreateUser=await db.User.create({
            firstName: newUser.firstName,
            lastName:  newUser.lastName,
            dateBorn: newUser.dateBorn,
            genderId: newUser.gender,
            imagen: photo ? photo.filename : "",
            pwd: newUser.password,
            isAdmin:0
        });
        
        //create data table UserPhone
        const isCreatePhone = await db.UserPhone.create({
            userId: isCreateUser.id,
            phone: newUser.phone,
            categoryId:1
        }) ;
    
        //create data table UserPhone
        const isCreateEmail=await db.UserEmail.create({
            userId: isCreateUser.id,
            email:newUser.email,
            categoryId:1
        });
    
        //create data table UserPhone
        const isCreateLocations=await db.UserLocation.create({
            userId: isCreateUser.id,
            country: newUser.country,
            provinceState: newUser.province_state,
            cityTown: newUser.city_town,
            addressLine: newUser.address
        });
    
        return isCreateUser;

    } catch (error) {
        console.log("ha Ocurrido un error al crear al usuario", error)
    }


        /*include:[
            {
                model:db.UserPhones,
                as: "phones",
                number: newUser.phone,
                categoryId:1

            },
            {
                model:db.UserEmail,
                as: "emails",
                email:newUser.email,
                categoryId:1
            },
            {
                model:db.UserLocation,
                as: "locations",
                country: newUser.country,
                provinceState: newUser.province_state,
                cityTown: newUser.city_town,
                addressLine: newUser.address
            }
        ] */
    

    
};

/**
 * Update User
 * @param {Body} body the request http
 * @returns Response http 
 */
 userServices.updateUser=async(newUser) =>{

    try {
        
        //Create data table User
        const isCreateUser=await db.User.create({
            firstName: newUser.firstName,
            lastName:  newUser.lastName,
            dateBorn: newUser.dateBorn,
            genderId: newUser.gender,
            imagen: newUser.image ? photo.filename : "",
            pwd: newUser.password,
            isAdmin:0
        });
        
        //create data table UserPhone
        const isCreatePhone = await db.UserPhone.create({
            userId: isCreateUser.id,
            phone: newUser.phone,
            categoryId:1
        }) ;
    
        //create data table UserPhone
        const isCreateEmail=await db.UserEmail.create({
            userId: isCreateUser.id,
            email:newUser.email,
            categoryId:1
        });
    
        //create data table UserPhone
        const isCreateLocations=await db.UserLocation.create({
            userId: isCreateUser.id,
            country: newUser.country,
            provinceState: newUser.province_state,
            cityTown: newUser.city_town,
            addressLine: newUser.address
        });
    
        return isCreateUser;

    } catch (error) {
        console.log("ha Ocurrido un error al crear al usuario", error)
    }
    
};




module.exports=userServices;