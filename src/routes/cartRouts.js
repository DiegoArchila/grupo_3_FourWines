/* Imports */
const express=require("express");
const router=express.Router();

const cartController = require("../controllers/cartController.js");
const cartApiController = require("../controllers/apis/cart.controller.js");


router.get("/cart", cartController.cart);


/**
 * API ROUTES
 */

router
    .get("/user/cart",cartApiController.show)

module.exports=router;
