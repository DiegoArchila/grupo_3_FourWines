/* Imports */
const express = require("express");
const router = express.Router();

const productCategoryController = require("../../controllers/apis/ProductCategoryController.js");

const urlProducts = "/api/product-category";

//All productCategory
router.get(`${urlProducts}`, productCategoryController.findAll);

//Product category
router.get(
  `${urlProducts}/detail/:id`,
  productCategoryController.findProductCategory
);

module.exports = router;
