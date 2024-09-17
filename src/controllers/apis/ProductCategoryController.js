const productCategoryRepository = require("../../repositories/ProductCategoryRepository.js");
const ApiFormats = require("../../lib/ApiFormats.js");

/**
 * Return all productCategory
 *
 * @param {*} req   - is an object containing information about the HTTP request that raised the event
 * @param {*} res   - to send back the desired HTTP response
 * @return {*} response  -Json with all the productCategory and aditional api data
 */
const findAll = async (req, res) => {
  let allProductCategory = [];
  let response = [];

  allProductCategory = await productCategoryRepository.findAll();

  response = ApiFormats.ApiFormat(ApiFormats.ApiStatus.OK, allProductCategory);

  return res.status(response.status).json(response);
};

/**
 * Return a productCategory by id
 *
 * @param {*} req   - is an object containing information about the HTTP request that raised the event
 * @param {*} res   - to send back the desired HTTP response
 * @return {*} response  -Json with the productCategory and aditional api data
 */
const findProductCategory = async (req, res) => {
  let productCategory = {};
  let response = [];
  let idProductCategory = req.params.id;

  productCategory = await productCategoryRepository.findByPk(idProductCategory);

  response = ApiFormats.ApiFormat(ApiFormats.ApiStatus.OK, productCategory);

  return res.status(response.status).json(response);
};

module.exports = {
  findAll,
  findProductCategory,
};
