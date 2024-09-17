/* Imports */
const express = require("express");
const router = express.Router();

const productsController = require("../controllers/productsController.js");

const urlProducts = "/products";

//All products
router.get(`${urlProducts}`, productsController.viewAllProducts);

//Products by category
router.get(
  `${urlProducts}/category/:categoryId`,
  productsController.viewProductsByCategory
);

//Product detail
router.get(`${urlProducts}/detail/:id`, productsController.detailProduct);

module.exports = router;
