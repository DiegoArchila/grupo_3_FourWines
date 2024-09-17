const db = require("../database/models/index.js");
const Log = require("../lib/ConsoleLogs.js");

/**
 * Find all products Categories
 *
 * @param {{}} [params=null] -Params like where conditions, order, etc.
 * @return {*} categories   -All categories
 */
const findAll = async (params = null) => {
  Log.consoleLogs(
    Log.LogsTypes.INFO,
    `Request for get all productsCategory` +
      (params ? ` by: ${JSON.stringify(params)}` : "")
  );
  let categories = [];
  try {
    categories = await db.ProductCategory.findAll({
      ...params,
    });
  } catch (error) {
    Log.consoleLogs(Log.LogsTypes.ERR, error);
    throw error;
  }

  if (categories.length > 0) {
    Log.consoleLogs(
      Log.LogsTypes.SUCCESS,
      `${categories.length} productsCategory have been found`
    );
  } else {
    Log.consoleLogs(
      Log.LogsTypes.WARM,
      `${categories.length} productsCategory not found`
    );
  }

  return categories;
};

/**
 * Find one productCategory by id
 *
 * @param {number} id    -Id of the productCategory
 * @param {{}} [params=null] -Params like where conditions, order, etc.
 * @return {*} The productCategory by id
 */
let findByPk = async (id, params = null) => {
  if (!id) {
    Log.consoleLogs(Log.LogsTypes.ERR, "The id is null");
    return null;
  }
  Log.consoleLogs(
    Log.LogsTypes.INFO,
    `Request for get one productCategory by id: ${id}` +
      (params ? ` and by: ${JSON.stringify(params)}` : "")
  );
  let productCategory = {};
  try {
    productCategory = await db.ProductCategory.findByPk(id, { ...params });
  } catch (error) {
    Log.consoleLogs(Log.LogsTypes.ERR, error);
    throw error;
  }

  if (productCategory) {
    Log.consoleLogs(
      Log.LogsTypes.SUCCESS,
      `productCategory has been found: ${productCategory}`
    );
  } else {
    Log.consoleLogs(Log.LogsTypes.WARM, `productCategory not found`);
  }

  return productCategory;
};

/**
 * Update productCategory by id
 *
 * @param {*} productCategory -Update data
 * @param {{}} [params=null] -Params like where conditions, order, etc.
 * @return {*} -Product update
 */
const update = async (productCategory, params = null) => {
  Log.consoleLogs(
    Log.LogsTypes.INFO,
    "Request for update productCategory" +
      (params ? ` by: ${JSON.stringify(params)}` : "")
  );
  let productCategoryUpdate = {};
  try {
    productCategoryUpdate = await db.ProductCategory.update(productCategory, {
      ...params,
    });
  } catch (error) {
    Log.consoleLogs(Log.LogsTypes.ERR, error);
    throw error;
  }

  if (productCategoryUpdate) {
    Log.consoleLogs(
      Log.LogsTypes.SUCCESS,
      `product has been update: ${productCategoryUpdate}`
    );
  } else {
    Log.consoleLogs(Log.LogsTypes.WARM, `productCategory not update`);
  }

  return productCategoryUpdate;
};

/**
 * Delete a ProductCategory by where condition
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
    `Request for delete ProductCategory where: ${where}`
  );

  try {
    await db.ProductCategory.destroy({ where });
  } catch (error) {
    Log.consoleLogs(Log.LogsTypes.ERR, error);
    throw error;
  }

  Log.consoleLogs(Log.LogsTypes.SUCCESS, `The Product was delete`);

  return true;
};

/**
 * Create a productCategory
 *
 * @param {*} productCategory  -ProductCategory to create
 * @return {*} -The new product
 */
const create = async (productCategory) => {
  if (!productCategory) {
    Log.consoleLogs(Log.LogsTypes.ERR, "No data for create a productCategory");
    return null;
  }
  let newProductCategory = {};
  Log.consoleLogs(Log.LogsTypes.INFO, `Request for create ProductCategory`);
  try {
    newProductCategory = await db.ProductCategory.create(productCategory);
  } catch (error) {
    Log.consoleLogs(Log.LogsTypes.ERR, error);
    throw error;
  }

  Log.consoleLogs(Log.LogsTypes.SUCCESS, `The ProductCategory was create`);

  return newProducto;
};

module.exports = {
  findAll,
  findByPk,
  update,
  create,
  deleteWhere,
};
