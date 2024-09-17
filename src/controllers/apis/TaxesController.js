const taxesRepository = require("../../repositories/TaxesRepository.js");
const ApiFormats = require("../../lib/ApiFormats.js");

/**
 * Return all taxes
 *
 * @param {*} req   - is an object containing information about the HTTP request that raised the event
 * @param {*} res   - to send back the desired HTTP response
 * @return {*} response  -Json with all the productCategory and aditional api data
 */
const findAll = async (req, res) => {
  let allTaxes = [];
  let response = [];

  allTaxes = await taxesRepository.findAll();

  response = ApiFormats.ApiFormat(ApiFormats.ApiStatus.OK, allTaxes);

  return res.status(response.status).json(response);
};

/**
 * Return a tax by id
 *
 * @param {*} req   - is an object containing information about the HTTP request that raised the event
 * @param {*} res   - to send back the desired HTTP response
 * @return {*} response  -Json with the productCategory and aditional api data
 */
const findTax = async (req, res) => {
  let tax = {};
  let response = [];
  let idTax = req.params.id;

  tax = await taxesRepository.findByPk(idTax);

  response = ApiFormats.ApiFormat(ApiFormats.ApiStatus.OK, tax);

  return res.status(response.status).json(response);
};

module.exports = {
  findAll,
  findTax,
};
