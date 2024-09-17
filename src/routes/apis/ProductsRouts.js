/* Imports */
const express = require("express");
const router = express.Router();
const imageSaver = require("../../lib/imageSaver.js");
const {
  ValidationTypes,
  Validations,
} = require("../../middleWares/Validations.js");

const productsController = require("../../controllers/apis/ProductsController.js");

//Imagen principal del producto
let saveProductImages = imageSaver.saveImages("public/img/products");

const urlProducts = "/api/products";

//Validaciones
let validacionesEditProduct = Validations([
  [
    "productName",
    [
      ValidationTypes.notEmpty,
      [ValidationTypes.isLength, { min: 2, max: 128 }],
    ],
  ],
  [
    "productDescription",
    [
      ValidationTypes.notEmpty,
      [ValidationTypes.isLength, { min: 2, max: 512 }],
    ],
  ],
  [
    "productTerminated",
    [ValidationTypes.notEmpty, [ValidationTypes.isLength, { min: 2, max: 64 }]],
  ],
  ["categoryId", [ValidationTypes.notEmpty, ValidationTypes.isInt]],
  [
    "unitsBuyes",
    [ValidationTypes.notEmpty, [ValidationTypes.isInt, { min: 0, max: 999 }]],
  ],
  [
    "priceGross",
    [ValidationTypes.notEmpty, [ValidationTypes.isFloat, { min: 0 }]],
  ],
  [
    "priceFinal",
    [ValidationTypes.notEmpty, [ValidationTypes.isFloat, { min: 0 }]],
  ],
]);

//All products
router.get(`${urlProducts}`, productsController.findAll);

//Product detail
router.get(`${urlProducts}/detail/:id`, productsController.findProduct);

//Products by category
router.get(
  `${urlProducts}/category/:categoryId`,
  productsController.findProductsByCategory
);

//Edit a product
router.post(
  `${urlProducts}/edit/:id`,
  validacionesEditProduct,
  productsController.updateProduct
);

//Delete a product
router.post(`${urlProducts}/delete/:id`, productsController.deleteProduct);

//Create a product
router.post(
  `${urlProducts}/create`,
  validacionesEditProduct,
  productsController.createProduct
);

module.exports = router;
