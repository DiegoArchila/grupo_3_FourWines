const db = require("../database/models/index.js");
const Log = require("../lib/ConsoleLogs.js");

/**
 * Find all taxes
 *
 * @param {{}} [params=null] -Params like where conditions, order, etc.
 * @return {*} taxes   -All taxes
 */
const findAll = async (params = null) => {
  Log.consoleLogs(
    Log.LogsTypes.INFO,
    `Request for get all taxes` +
      (params ? ` by: ${JSON.stringify(params)}` : "")
  );
  let taxes = [];
  try {
    taxes = await db.Tax.findAll({
      ...params,
    });
  } catch (error) {
    Log.consoleLogs(Log.LogsTypes.ERR, error);
    throw error;
  }

  if (taxes.length > 0) {
    Log.consoleLogs(
      Log.LogsTypes.SUCCESS,
      `${taxes.length} taxes have been found`
    );
  } else {
    Log.consoleLogs(Log.LogsTypes.WARM, `taxes not found`);
  }

  return taxes;
};

/**
 * Find one tax by id
 *
 * @param {number} id    -Id of the tax
 * @param {{}} [params=null] -Params like where conditions, order, etc.
 * @return {*} The tax by id
 */
let findByPk = async (id, params = null) => {
  if (!id) {
    Log.consoleLogs(Log.LogsTypes.ERR, "The id is null");
    return null;
  }
  Log.consoleLogs(
    Log.LogsTypes.INFO,
    `Request for get one tax by id: ${id}` +
      (params ? ` and by: ${JSON.stringify(params)}` : "")
  );
  let tax = {};
  try {
    tax = await db.Tax.findByPk(id, { ...params });
  } catch (error) {
    Log.consoleLogs(Log.LogsTypes.ERR, error);
    throw error;
  }

  if (tax) {
    Log.consoleLogs(Log.LogsTypes.SUCCESS, `Tax has been found: ${tax}`);
  } else {
    Log.consoleLogs(Log.LogsTypes.WARM, `tax not found`);
  }

  return tax;
};

/**
 * Update tax by id
 *
 * @param {*} tax -Update data
 * @param {{}} [params=null] -Params like where conditions, order, etc.
 * @return {*} -Product update
 */
const update = async (tax, params = null) => {
  Log.consoleLogs(
    Log.LogsTypes.INFO,
    "Request for update tax" + (params ? ` by: ${JSON.stringify(params)}` : "")
  );
  let taxUpdate = {};
  try {
    taxUpdate = await db.Tax.update(tax, {
      ...params,
    });
  } catch (error) {
    Log.consoleLogs(Log.LogsTypes.ERR, error);
    throw error;
  }

  if (taxUpdate) {
    Log.consoleLogs(Log.LogsTypes.SUCCESS, `tax has been update: ${taxUpdate}`);
  } else {
    Log.consoleLogs(Log.LogsTypes.WARM, `tax not update`);
  }

  return tax;
};

/**
 * Delete a tax by where condition
 *
 * @param {*} where -The where condition for the delete
 * @return {boolean}  -Return true if the delete was success
 */
const deleteWhere = async (where) => {
  if (!where) {
    Log.consoleLogs(Log.LogsTypes.ERR, "Specify a where condicion for delete");
    return false;
  }
  Log.consoleLogs(Log.LogsTypes.INFO, `Request for delete tax where: ${where}`);

  try {
    await db.Tax.destroy({ where });
  } catch (error) {
    Log.consoleLogs(Log.LogsTypes.ERR, error);
    throw error;
  }

  Log.consoleLogs(Log.LogsTypes.SUCCESS, `The tax was delete`);

  return true;
};

/**
 * Create a tax
 *
 * @param {*} tax  -Tax to create
 * @return {*} -The new product
 */
const create = async (tax) => {
  if (!tax) {
    Log.consoleLogs(Log.LogsTypes.ERR, "No data for create a tax");
    return null;
  }
  let newTax = {};
  Log.consoleLogs(Log.LogsTypes.INFO, `Request for create tax`);
  try {
    newTax = await db.Tax.create(tax);
  } catch (error) {
    Log.consoleLogs(Log.LogsTypes.ERR, error);
    throw error;
  }

  Log.consoleLogs(Log.LogsTypes.SUCCESS, `The tax was create`);

  return tax;
};

module.exports = {
  findAll,
  findByPk,
  update,
  create,
  deleteWhere,
};
