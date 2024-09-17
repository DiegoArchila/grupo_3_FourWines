/* Imports */
const express = require("express");
const router = express.Router();

const { login, createUser } = require("../controllers/apis/main.controller.js");

const {
  validationsCreateUser,
  validateErrorscreateUser,
  checkLogin,
  validateCheckLogin,
  uploadFile,
} = require("../middleWares/formsMiddleWares.js");

const mainController = require("../controllers/mainController.js");

router.get("/", mainController.home);
router.get("/login", mainController.login);

router.get("/user/create", mainController.showCreateUser);
router.post(
  "/user/create",
  validationsCreateUser,
  validateErrorscreateUser,
  mainController.createUser
);

/**
 * -------------------- Api Routes
 */

// login
router.post("/api/login", checkLogin, validateCheckLogin, login);

// Create User
router.post(
  "/api/user/create",
  uploadFile.single("image"),
  validationsCreateUser,
  validateCheckLogin,
  createUser
);

module.exports = router;
