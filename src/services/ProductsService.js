const productsRepository = require("../repositories/ProductsRepository.js");
const productImagesRepository = require("../repositories/ProductImagesRepository.js");
const productCategoryRepository = require("../repositories/ProductCategoryRepository.js");
const productTaxesRepository = require("../repositories/ProductTaxesRepository.js");
const functions = require("../lib/functions.js");

/**
 * Update a product
 *
 * @param {*} productId -Id of the product to update
 * @param {*} producto  -Data for update
 * @param {*} images -Product images
 * @return {*} -Product updated
 */
const updateProduct = async (productId, producto, images) => {
  //product data organized

  let productUpdate = {};

  productUpdate = await productsRepository.update(producto, {
    where: { id: productId },
  });

  if (images && images.length > 0) {
    let imageUpdate = null;
    let image = null;
    for (let i = 0; i < images.length; i++) {
      image = await productImagesRepository.findOne({
        where: { productId, isMain: 1 },
      });
      console.log(image);
      imageUpdate = await productImagesRepository.update(
        {
          isMain: i == 0 ? 1 : 0,
          pathImagen: `${images[i][0]}.png`,
          productId,
        },
        { where: { id: image.id } }
      );
      if (imageUpdate) {
        functions.saveBase64ToImage(images[i][1], images[i][0]);
      }
    }
  }

  if (producto.taxes && producto.taxes.length > 0) {
    let productTaxes = await productTaxesRepository.findAll({
      where: { productId },
    });
    if (productTaxes && productTaxes > 0) {
      await productTaxesRepository.deleteWhere({
        where: { productId },
      });
    }
    for (const tax of producto.taxes) {
      await productTaxesRepository.create({
        taxeId: Number(tax.id),
        productId: productId,
      });
    }
  }

  return productUpdate;
};

/**
 * Delete a product by id
 *
 * @param {number} productId -Id of the product or delete
 * @return {boolean} -Return true if the delete of the product and there children was success
 */
const deleteProduct = async (productId) => {
  //let principalImage = {};
  /*principalImage = await db.ProductImages.findOne({
          where: { productId, isMain: true },
        });
        if (principalImage.pathImagen) {
          functions.eliminarArchivo(
            `/public/img/store/products/${principalImage.pathImagen}`
          );
        }*/
  let deleteSuccess = false;

  deleteSuccess = await productImagesRepository.deleteWhere({ productId });
  deleteSuccess = await productTaxesRepository.deleteWhere({ productId });
  deleteSuccess = await productsRepository.deleteWhere({ id: productId });

  return deleteSuccess;
};

/**
 * Create a new product
 *
 * @param {*} producto  -Product to create
 * @param {*} images -images of the product [name,base64]
 * @return {*}  -Product create
 */
const createProduct = async (producto, images) => {
  let newProducto = {};

  newProducto = await productsRepository.create(producto);

  if (images.length > 0) {
    let imageNew = null;
    for (let i = 0; i < images.length; i++) {
      imageNew = await productImagesRepository.create({
        isMain: i == 0 ? 1 : 0,
        pathImagen: `${images[i][0]}.png`,
        productId: newProducto.id,
      });
      if (imageNew) {
        functions.saveBase64ToImage(images[i][1], images[i][0]);
      }
    }
  }

  if (producto.taxes) {
    for (const tax of producto.taxes) {
      await productTaxesRepository.create({
        taxeId: Number(tax.id),
        productId: newProducto.id,
      });
    }
  }

  return newProducto;
};

module.exports = {
  updateProduct,
  deleteProduct,
  createProduct,
};
