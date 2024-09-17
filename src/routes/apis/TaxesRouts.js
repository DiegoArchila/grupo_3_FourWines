/* Imports */
const express = require("express");
const router = express.Router();

const taxesController = require("../../controllers/apis/TaxesController.js");

const urlTaxes = "/api/taxes";

//All taxes
router.get(`${urlTaxes}`, taxesController.findAll);

//tax
router.get(`${urlTaxes}/detail/:id`, taxesController.findTax);

module.exports = router;
