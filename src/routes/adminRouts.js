/* Imports */
const express = require("express");
const router = express.Router();

//const { login } = require("../controllers/apis/admin.controller.js");

const imageSaver = require("../lib/imageSaver.js");
const adminController = require("../controllers/adminController.js");

//Imagen principal del producto
let saveProductImages = imageSaver.saveImages("public/img/products");

router.get("/admin", adminController.admin);

// Admin User
router.get("/admin/user", adminController.user);
router.post("/admin/user", adminController.user);

//Admin Products
router.get("/admin/products", adminController.products);
router.get("/admin/products/edit/:id", adminController.editProductView);
router.post("/admin/products/edit/:id", adminController.editProduct);
router.post("/admin/products/delete/:id", adminController.deleteProduct);
router.get("/admin/products/create", adminController.createProduct);
router.post(
  "/admin/products/create",
  saveProductImages.single("imageMain"),
  adminController.createProductPost
);

/**
 * -------------------- API
 */

router.get("/api/admin/user");

//router
//  .get("/api/admin/user", login);

module.exports = router;
