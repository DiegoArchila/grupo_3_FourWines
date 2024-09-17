const productsService = require("../../services/ProductsService.js");
const productRepository = require("../../repositories/ProductsRepository.js");
const ApiFormats = require("../../lib/ApiFormats.js");
const db = require("../../database/models/index.js");
const Op = db.Sequelize.Op;

/**
 * Return all products
 *
 * @param {*} req   - is an object containing information about the HTTP request that raised the event
 * @param {*} res   - to send back the desired HTTP response
 * @return {*} response  -Json with all the products and aditional api data
 */
const findAll = async (req, res) => {
  let allProducts = [];
  let response = [];
  let queryParams = req.query;
  let params = null; //Parametros para la consulta

  if (queryParams) {
    let data = []; //Parametros a validar en el query string
    //productName
    if (queryParams.productName)
      data.push({ productName: { [Op.substring]: queryParams.productName } });
    //sku
    if (queryParams.sku)
      data.push({ sku: { [Op.substring]: queryParams.sku } });
    //productTerminated
    if (queryParams.productTerminated)
      data.push({
        productTerminated: { [Op.substring]: queryParams.productTerminated },
      });
    //categoryId
    if (queryParams.categoryId)
      data.push({ categoryId: { [Op.eq]: Number(queryParams.categoryId) } });
    //isActive
    if (queryParams.isActive)
      data.push({ isActive: { [Op.eq]: queryParams.isActive == "true" } });
    //PriceFinal between
    if (queryParams.priceStart && queryParams.priceEnd)
      data.push({
        priceFinal: {
          [Op.between]: [
            Number(queryParams.priceStart),
            Number(queryParams.priceEnd),
          ],
        },
      });

    params = {
      where: {
        [Op.and]: data,
      },
      limit:
        queryParams.limit && Number(queryParams.limit) >= 0
          ? Number(queryParams.limit)
          : null,
      order: queryParams.order ? [queryParams.order.split(",")] : null,
    };
  }

  allProducts = await productRepository.findAll(params);

  response = ApiFormats.ApiFormat(ApiFormats.ApiStatus.OK, allProducts);

  return res.status(response.status).json(response);
};

/**
 * Return a product by id
 *
 * @param {*} req   - is an object containing information about the HTTP request that raised the event
 * @param {*} res   - to send back the desired HTTP response
 * @return {*} response  -Json with all the products and aditional api data
 */
const findProduct = async (req, res) => {
  let product = {};
  let response = [];
  let idProduct = req.params.id;

  if (!idProduct) {
    return res
      .status(ApiFormats.ApiStatus.NOT_FOUND.code)
      .json(ApiFormats.ApiFormat(ApiFormats.ApiStatus.NOT_FOUND));
  }

  product = await productRepository.findByPk(idProduct);

  response = ApiFormats.ApiFormat(ApiFormats.ApiStatus.OK, product);

  return res.status(response.status).json(response);
};

/**
 * Return all products by category
 *
 * @param {*} req   - is an object containing information about the HTTP request that raised the event
 * @param {*} res   - to send back the desired HTTP response
 * @return {*} response  -Json with all the products by category and aditional api data
 */
const findProductsByCategory = async (req, res) => {
  let categoryId = req.params.categoryId ? req.params.categoryId : null;
  let productsResponse = [];
  let response = [];

  if (!categoryId) {
    return res
      .status(ApiFormats.ApiStatus.NOT_FOUND.code)
      .json(ApiFormats.ApiFormat(ApiFormats.ApiStatus.NOT_FOUND));
  }

  productsResponse = await productRepository.findAll({ where: { categoryId } });

  response = ApiFormats.ApiFormat(ApiFormats.ApiStatus.OK, productsResponse);

  return res.status(response.status).json(response);
};

/**
 * Return product update
 *
 * @param {*} req   - is an object containing information about the HTTP request that raised the event
 * @param {*} res   - to send back the desired HTTP response
 * @return {*} response  -Json with the product update and aditional api data
 */
const updateProduct = async (req, res) => {
  let productId = req.params.id;
  let response = [];
  let productUpdate = {};
  let body = req.body;
  let producto = {};
  let images = [];

  if (!productId) {
    return res
      .status(ApiFormats.ApiStatus.NOT_FOUND.code)
      .json(ApiFormats.ApiFormat(ApiFormats.ApiStatus.NOT_FOUND));
  }

  producto = {
    id: productId,
    productName: body.productName,
    productDescription: body.productDescription,
    productTerminated: body.productTerminated,
    sku: body.sku,
    categoryId: Number(body.category.id),
    unitsBuyes: Number(body.unitsBuyes),
    unitsSelled: 0,
    isActive: body.isActive,
    priceGross: Number(body.priceGross),
    priceFinal: calculoPrecioFinal(body),
    discount: Number(body.discount),
    taxes: body.taxes,
  };

  if (body.mainImage) {
    images.push([`${Date.now()}`, body.mainImage]);
  }

  productUpdate = await productsService.updateProduct(
    productId,
    producto,
    body.mainImage ? images : null
  );

  response = ApiFormats.ApiFormat(ApiFormats.ApiStatus.OK, productUpdate);

  return res.status(response.status).json(response);
};

/**
 * Delete product
 *
 * @param {*} req   - is an object containing information about the HTTP request that raised the event
 * @param {*} res   - to send back the desired HTTP response
 * @return {*} Status
 */
const deleteProduct = async (req, res) => {
  let productId = Number(req.params.id);
  let response = [];
  let deleteSuccess = false;

  if (!productId) {
    return res
      .status(ApiFormats.ApiStatus.NOT_FOUND.code)
      .json(ApiFormats.ApiFormat(ApiFormats.ApiStatus.NOT_FOUND));
  }

  deleteSuccess = await productsService.deleteProduct(productId);

  if (!deleteSuccess) {
    response = ApiFormats.ApiFormat(ApiFormats.ApiStatus.BAD_REQUEST);
  } else {
    response = ApiFormats.ApiFormat(ApiFormats.ApiStatus.OK);
  }

  return res.status(response.status).json(response);
};

/**
 * Create product
 *
 * @param {*} req   - is an object containing information about the HTTP request that raised the event
 * @param {*} res   - to send back the desired HTTP response
 * @return {*} Status
 */
const createProduct = async (req, res, next) => {
  let body = req.body;
  let response = [];
  let producto = {};
  let newProducto = {};
  let images = [];

  if (!body) {
    return res
      .status(ApiFormats.ApiStatus.BAD_REQUEST.code)
      .json(ApiFormats.ApiFormat(ApiFormats.ApiStatus.BAD_REQUEST));
  }

  producto = {
    productName: body.productName,
    productDescription: body.productDescription,
    productTerminated: body.productTerminated,
    sku: body.sku,
    categoryId: Number(body.category.id),
    unitsBuyes: Number(body.unitsBuyes),
    unitsSelled: 0,
    isActive: body.isActive,
    priceGross: Number(body.priceGross),
    priceFinal: calculoPrecioFinal(body),
    discount: Number(body.discount),
    taxes: body.taxes,
  };

  if (body.mainImage) {
    images.push([`${Date.now()}`, body.mainImage]);
  }

  newProducto = await productsService.createProduct(producto, images);

  if (!newProducto) {
    response = ApiFormats.ApiFormat(ApiFormats.ApiStatus.BAD_REQUEST);
  } else {
    response = ApiFormats.ApiFormat(ApiFormats.ApiStatus.OK, newProducto);
  }

  return res.status(response.status).json(response);
};

const calculoPrecioFinal = (product) => {
  let taxesSum = 0;
  if (product.taxes && product.taxes.length > 0) {
    for (let tax of product.taxes) {
      taxesSum += Number(tax.taxeValue);
    }
  }
  let priceFinal =
    Math.round(
      Number(product.priceGross) *
        (1 - Number(product.discount) / 100) *
        (1 + taxesSum / 100) *
        100
    ) / 100;
  return priceFinal;
};

module.exports = {
  findAll,
  findProduct,
  findProductsByCategory,
  updateProduct,
  deleteProduct,
  createProduct,
};
