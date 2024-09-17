const db = require("../database/models/index.js");
const Op = db.Sequelize.Op;
const products = require("../databases/business/products.json");
const orders = require("../databases/business/orders.json");
const functions = require("../lib/functions.js");
const fs = require("fs");

/**Index contain information from title the page.
 *
 * index {
 *  name: name of the project
 *  title: title of the page
 * }
 */
const index = require("../databases/index.json");

/**settingGeneralSite contain information from the struct of the head.
 *
 * settingGeneralSite {
 *  languaje: lanjuaje of the site (See the settingGeneralSite.json)
 *  title: title of the page
 * }
 */
const settingGeneral = require("../databases/settingGeneralSite.json");

/** Format the price to currency COP
 */
const { toCOP } = require("../lib/formats.js");

/**MiniBanner
 * For more information see /wiews/partials/miniBanner.ejs
 */
minibar = {
  title: "Admin Principal",
  icon: "eos-icons:admin-outlined",
};

module.exports = {
  admin: (req, res) => {
    res.render("./admin/index.ejs", {
      index,
      settingGeneral,
      toCOP,
      minibar,
      orders,
    });
  },
  products: async (req, res) => {
    let products = [];
    try {
      products = await db.Product.findAll({ order: [["productName", "ASC"]] });
    } catch (error) {
      console.error(error);
      throw error;
    }
    res.render("./admin/products.ejs", {
      index,
      settingGeneral,
      minibar,
      toCOP,
      products,
    });
  },
  createProduct: async (req, res) => {
    let categories = [];
    let taxes = [];
    try {
      categories = await db.ProductCategory.findAll({
        order: [["category", "ASC"]],
      });
      taxes = await db.Tax.findAll({
        where: { isActive: 1 },
        order: [["taxeName", "ASC"]],
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
    res.render("./admin/createProduct.ejs", {
      index,
      settingGeneral,
      minibar,
      toCOP,
      categories,
      taxes,
    });
  },
  createProductPost: async (req, res, next) => {
    const body = req.body;
    const file = req.file;
    if (!file) {
      const error = new Error("Por favor seleccione un archivo");
      error.httpStatusCode = 400;
      return next(error);
    }
    if (body) {
      let producto = {};
      let discount =
        Math.round(
          (1 - Number(body.priceFinal) / Number(body.priceGross)) * 10000
        ) / 100; //Dos decimales maximo
      try {
        producto = await db.Product.create({
          productName: body.productName,
          productDescription: body.productDescription,
          productTerminated: body.productTerminated,
          sku: body.sku,
          categoryId: Number(body.categoryId),
          unitsBuyes: Number(body.unitsBuyes),
          unitsSelled: 0,
          isActive: body.isActive == "on",
          priceGross: Number(body.priceGross),
          priceFinal: Number(body.priceFinal),
          discount,
        });
        await db.ProductImages.create({
          isMain: 1,
          pathImagen: file.filename,
          productId: producto.id,
        });
        if (body.taxesId) {
          await db.ProductTaxes.create({
            taxeId: Number(body.taxesId),
            productId: producto.id,
          });
        }
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
  },
  editProductView: async (req, res) => {
    let productId = req.params.id;
    if (productId) {
      let product = {};
      let productTaxId = undefined;
      let categories = [];
      let taxes = [];
      let imagePrincipal = null;
      try {
        product = await db.Product.findByPk(productId);
        if (product) {
          productTaxId = await db.ProductTaxes.findOne({
            where: { productId: product.id },
          });
          imagePrincipal = await db.ProductImages.findOne({
            where: { productId: product.id, isMain: true },
          });
          categories = await db.ProductCategory.findAll({
            order: [["category", "ASC"]],
          });
          taxes = await db.Tax.findAll({ order: [["taxeName", "ASC"]] });
          res.render("../views/admin/editProduct.ejs", {
            index,
            settingGeneral,
            minibar,
            toCOP,
            product,
            productTaxId,
            categories,
            taxes,
            imagePrincipal,
          });
        }
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
  },
  editProduct: async (req, res) => {
    let productId = req.params.id;
    if (productId) {
      const body = req.body;
      console.log(body);
      let discount =
        Math.round(
          (1 - Number(body.priceFinal) / Number(body.priceGross)) * 10000
        ) / 100; //Dos decimales maximo
      try {
        await db.Product.update(
          {
            productName: body.productName,
            productDescription: body.productDescription,
            productTerminated: body.productTerminated,
            sku: body.sku,
            categoryId: Number(body.categoryId),
            unitsBuyes: Number(body.unitsBuyes),
            isActive: body.isActive == "on",
            priceGross: Number(body.priceGross),
            priceFinal: Number(body.priceFinal),
            discount,
          },
          { where: { id: productId } }
        );
        /*await db.ProductImages.update({          
          pathImagen: file.filename,          
        },{where:{productId:productId,isMain:true}});*/
        await db.ProductTaxes.update(
          {
            taxeId: Number(body.taxesId),
          },
          { where: { productId } }
        );
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
  },
  deleteProduct: async (req, res) => {
    let productId = req.params.id;
    if (productId) {
      let principalImage = {};
      try {
        /*principalImage = await db.ProductImages.findOne({
          where: { productId, isMain: true },
        });
        if (principalImage.pathImagen) {
          functions.eliminarArchivo(
            `/public/img/store/products/${principalImage.pathImagen}`
          );
        }*/
        await db.ProductImages.destroy({ where: { productId, isMain: true } });
        await db.ProductTaxes.destroy({ where: { productId } });
        await db.Product.destroy({ where: { id: productId } });
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
  },
  user: (req, res) => {
    res.render("./admin/adminUser.ejs", {
      index,
      settingGeneral,
      minibar,
    });
  },
};
