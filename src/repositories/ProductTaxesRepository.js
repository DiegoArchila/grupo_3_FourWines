const Log = require("../lib/ConsoleLogs.js");
const db = require("../database/models/index.js");

/**
 * Request for get all ProductTaxes
 *
 * @param {{}} [params=null] -Params like where conditions, order, etc.
 * @return {*}  -All ProductTaxes
 */
let findAll = async (params = null) => {
  Log.consoleLogs(
    Log.LogsTypes.INFO,
    "Request for get all ProductTaxes" +
      (params ? ` by: ${JSON.stringify(params)}` : "")
  );
  let allProductTaxes = [];
  try {
    allProductTaxes = await db.ProductTaxes.findAll({ ...params });
  } catch (error) {
    Log.consoleLogs(Log.LogsTypes.ERR, error);
    throw error;
  }
  if (allProductTaxes.length > 0) {
    Log.consoleLogs(
      Log.LogsTypes.SUCCESS,
      `${allProductTaxes.length} ProductTaxes have been found`
    );
  } else {
    Log.consoleLogs(
      Log.LogsTypes.WARM,
      `${allProductTaxes.length} ProductTaxes not found`
    );
  }

  return allProductTaxes;
};

/**
 * Find one ProductTaxes by id
 *
 * @param {number} id    -Id of the ProductTaxes
 * @param {{}} [params=null] -Params like where conditions, order, etc.
 * @return {*} The ProductTaxes by id
 */
let findByPk = async (id, params = null) => {
  if (!id) {
    Log.consoleLogs(Log.LogsTypes.ERR, "The id is null");
    return null;
  }
  Log.consoleLogs(
    Log.LogsTypes.INFO,
    `Request for get one ProductTaxes by id: ${id}` +
      (params ? ` and by: ${JSON.stringify(params)}` : "")
  );
  let productTax = {};
  try {
    productTax = await db.ProductTaxes.findByPk(id);
  } catch (error) {
    Log.consoleLogs(Log.LogsTypes.ERR, error);
    throw error;
  }

  if (productTax) {
    Log.consoleLogs(
      Log.LogsTypes.SUCCESS,
      `ProductTax has been found: ${productTax}`
    );
  } else {
    Log.consoleLogs(Log.LogsTypes.WARM, `ProductTax not found`);
  }

  return productTax;
};

/**
 * Update ProductTaxes. update the taxeId column where productId
 *
 * @param {*} taxId -Tax id for update
 * @param {{}} [params=null] -Params like where conditions, order, etc.
 * @return {*}
 */
const update = async (taxId, params = null) => {
  Log.consoleLogs(
    Log.LogsTypes.INFO,
    `Request for update one ProductTaxes id: ${taxId}` +
      (params ? ` by: ${JSON.stringify(params)}` : "")
  );
  let productTaxUpdate = {};
  try {
    productTaxUpdate = await db.ProductTaxes.update(taxId, ...params);
  } catch (error) {
    Log.consoleLogs(Log.LogsTypes.ERR, error);
    throw error;
  }

  if (productTaxUpdate) {
    Log.consoleLogs(
      Log.LogsTypes.SUCCESS,
      `ProductTax has been update: ${productTaxUpdate}`
    );
  } else {
    Log.consoleLogs(Log.LogsTypes.WARM, `ProductTax not update`);
  }

  return productTaxUpdate;
};

/**
 * Delete a ProductTax by where condition
 *
 * @param {*} where -The where condition for the delete
 * @return {boolean}  -Return true if the delete was success
 */
const deleteWhere = async (where) => {
  if (!where) {
    Log.consoleLogs(Log.LogsTypes.ERR, "Specify a where condicion for delete");
    return false;
  }
  Log.consoleLogs(
    Log.LogsTypes.INFO,
    `Request for delete ProductTaxes where: ${where}`
  );

  try {
    await db.ProductTaxes.destroy({ where });
  } catch (error) {
    Log.consoleLogs(Log.LogsTypes.ERR, error);
    throw error;
  }

  Log.consoleLogs(Log.LogsTypes.SUCCESS, `The ProductTaxes was delete`);

  return true;
};

/**
 * Create a productTaxes
 *
 * @param {*} productTax  -ProductTax to create
 * @return {*}  -New productTax
 */
const create = async (productTax) => {
  if (!productTax) {
    Log.consoleLogs(Log.LogsTypes.ERR, "productTax is null");
    return null;
  }
  Log.consoleLogs(Log.LogsTypes.INFO, `Request for create ProductTaxes`);
  let newProductTax = {};
  try {
    newProductTax = await db.ProductTaxes.create(productTax);
  } catch (error) {
    Log.consoleLogs(Log.LogsTypes.ERR, error);
    throw error;
  }

  Log.consoleLogs(Log.LogsTypes.SUCCESS, `The ProductTaxes was create`);

  return newProductTax;
};

module.exports = {
  findAll,
  findByPk,
  update,
  deleteWhere,
  create,
};
