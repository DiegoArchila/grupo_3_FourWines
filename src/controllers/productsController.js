const settingGeneral = require("../databases/settingGeneralSite.json");
const index = require("../databases/index.json");
const db = require("../database/models/index.js");
const Op = db.Sequelize.Op;
const products = require("../databases/business/products.json");
const categories = require("../databases/business/productsCategories.json");
/** Format the price to currency COP
 */
const { toCOP } = require("../lib/formats.js");

const { validationResult } = require("express-validator");

const functions = require("../lib/functions.js");

//All products
const viewAllProducts = async (req, res) => {
  let allProducts = [];
  let mainImages = [];
  let idProducts = [];
  let categories = [];
  try {
    allProducts = await db.Product.findAll({
      include: [
        {
          as: "category",
          model: db.ProductCategory,
        },
      ],
    });
    console.log(allProducts);
    categories = await db.ProductCategory.findAll();

    idProducts = allProducts.map((product) => {
      return product.id;
    });

    mainImages = await db.ProductImages.findAll({
      where: {
        productId: { [Op.in]: idProducts },
      },
    });

    allProducts.forEach((product) => {
      product.mainImage = mainImages.find(
        (image) => image.productId == product.id
      );
    });
    console.log(allProducts);
  } catch (error) {
    console.error(error);
    throw error;
  }
  return res.render("../views/products.ejs", {
    settingGeneral,
    index,
    products: allProducts, //products.sort((a, b) => b.buyes - a.buyes),
    toCOP,
    categories,
  });
};

//Products by category
const viewProductsByCategory = async (req, res) => {
  let categoryId = req.params.categoryId ? req.params.categoryId : null;
  let productsResponse = []; //products;
  let categories = [];

  if (categoryId) {
    //Filtro por categorias
    let category = {};
    let mainImages = [];
    let idProducts = [];
    try {
      category = await db.ProductCategory.findByPk(categoryId); //categories.find((category) => category.id == categoryId);
    } catch (error) {
      console.error(error);
      throw error;
    }
    if (category && category.category) {
      try {
        productsResponse = await db.Product.findAll({
          where: { categoryId: categoryId },
        }); /*products
        .filter((product) => product.category == category.name)
        .sort((a, b) => b.buyes - a.buyes); */

        idProducts = productsResponse.map((product) => {
          return product.id;
        });

        mainImages = await db.ProductImages.findAll({
          where: {
            productId: { [Op.in]: idProducts },
          },
        });

        productsResponse.forEach((product) => {
          product.mainImage = mainImages.find(
            (image) => image.productId == product.id
          );
        });
      } catch (error) {
        console.error(error);
        throw error;
      }
    }

    try {
      categories = await db.ProductCategory.findAll();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  return res.render("../views/products.ejs", {
    settingGeneral,
    index,
    products: productsResponse,
    categories,
    toCOP,
  });
};

const detailProduct = async (req, res) => {
  let id = req.params.id;
  let product = {}; //products.find((product) => product.id == id);
  let productImages = [];
  try {
    product = await db.Product.findByPk(id);
    productImages = await db.ProductImages.findAll({
      where: { productId: product.id },
      order: [["isMain", "DESC"]],
    });

    product.images = productImages;
  } catch (error) {
    console.error(error);
    throw error;
  }
  if (product) {
    return res.render("../views/productDetail.ejs", {
      settingGeneral,
      index,
      product,
      toCOP,
    });
  }
};

module.exports = {
  viewAllProducts,
  viewProductsByCategory,
  detailProduct,
};
