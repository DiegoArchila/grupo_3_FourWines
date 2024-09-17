const Log = require("../lib/ConsoleLogs.js");
const db = require("../database/models/index.js");
const Op = db.Sequelize.Op;

/**
 * Request for get all productsImages
 *
 * @param {{}} params -Params with conditions
 * @return {*} all productsImages
 */
let findAll = async (params = null) => {
  Log.consoleLogs(
    Log.LogsTypes.INFO,
    `Request for get all productsImages`,
    params ? ` by: ${JSON.stringify(params)}` : ""
  );
  let allProductImages = [];
  try {
    allProductImages = await db.ProductImages.findAll({ ...params });
  } catch (error) {
    Log.consoleLogs(Log.LogsTypes.ERR, error);
    throw error;
  }

  if (allProductImages.length > 0) {
    Log.consoleLogs(
      Log.LogsTypes.SUCCESS,
      `${allProductImages.length} productImages have been found`
    );
  } else {
    Log.consoleLogs(
      Log.LogsTypes.WARM,
      `${allProductImages.length} productImages not found`
    );
  }

  return allProductImages;
};

/**
 * Find one productImage by id
 *
 * @param {number} id    -Id of the productImage
 * @param {{}} params -Params with conditions
 * @return {*} The productImage by id
 */
let findByPk = async (id, params = null) => {
  if (!id) {
    Log.consoleLogs(Log.LogsTypes.ERR, "The id is null");
    return null;
  }
  Log.consoleLogs(
    Log.LogsTypes.INFO,
    `Request for get one productImage by id: ${id}` +
      (params ? ` and by: ${JSON.stringify(params)}` : "")
  );
  let productImage = {};
  try {
    productImage = await db.ProductImages.findByPk(id);
  } catch (error) {
    Log.consoleLogs(Log.LogsTypes.ERR, error);
    throw error;
  }

  if (productImage.length > 0) {
    Log.consoleLogs(
      Log.LogsTypes.SUCCESS,
      `productImage has been found: ${productImage}`
    );
  } else {
    Log.consoleLogs(Log.LogsTypes.WARM, `productImage not found`);
  }

  return productImage;
};

/**
 * Find one productImage by id
 *
 * @param {number} id    -Id of the productImage
 * @param {{}} params -Params with conditions
 * @return {*} The productImage by id
 */
let findOne = async (params) => {
  if (!params) {
    Log.consoleLogs(Log.LogsTypes.ERR, "The params is null");
    return null;
  }
  Log.consoleLogs(
    Log.LogsTypes.INFO,
    `Request for get one productImage by ` +
      (params ? ` params : ${JSON.stringify(params)}` : "")
  );
  let productImage = {};
  try {
    productImage = await db.ProductImages.findOne(params);
  } catch (error) {
    Log.consoleLogs(Log.LogsTypes.ERR, error);
    throw error;
  }

  if (productImage.length > 0) {
    Log.consoleLogs(
      Log.LogsTypes.SUCCESS,
      `productImage has been found: ${productImage}`
    );
  } else {
    Log.consoleLogs(Log.LogsTypes.WARM, `productImage not found`);
  }

  return productImage;
};

/**
 * Delete a ProductImage by where condition
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
    `Request for delete productsImage where: ${where}`
  );

  try {
    await db.ProductImages.destroy({ where });
  } catch (error) {
    Log.consoleLogs(Log.LogsTypes.ERR, error);
    throw error;
  }

  Log.consoleLogs(Log.LogsTypes.SUCCESS, `The ProductImage was delete`);

  return true;
};

/**
 * Create a productImage
 *
 * @param {*} productImage -ProductImage to create
 * @return {*} -New productImage
 */
const create = async (productImage) => {
  let newProductImage = {};
  Log.consoleLogs(Log.LogsTypes.INFO, `Request for create productsImage`);

  try {
    newProductImage = await db.ProductImages.create(productImage);
  } catch (error) {
    Log.consoleLogs(Log.LogsTypes.ERR, error);
    throw error;
  }

  return newProductImage;
};

/**
 * Update ProductImages by id
 *
 * @param {*} productImages -Update data
 * @param {{}} [params=null] -Params like where conditions, order, etc.
 * @return {*} -Product update
 */
const update = async (productImages, params = null) => {
  Log.consoleLogs(
    Log.LogsTypes.INFO,
    "Request for update productImages" +
      (params ? ` by: ${JSON.stringify(params)}` : "")
  );
  let productImagesUpdate = {};
  try {
    productImagesUpdate = await db.ProductImages.update(productImages, {
      ...params,
    });
  } catch (error) {
    Log.consoleLogs(Log.LogsTypes.ERR, error);
    throw error;
  }

  if (productImagesUpdate) {
    Log.consoleLogs(
      Log.LogsTypes.SUCCESS,
      `product has been update: ${productImagesUpdate}`
    );
  } else {
    Log.consoleLogs(Log.LogsTypes.WARM, `productImages not update`);
  }

  return productImagesUpdate;
};

module.exports = {
  findAll,
  findByPk,
  findOne,
  deleteWhere,
  create,
  update,
};
