const settingGeneral = require("../databases/settingGeneralSite.json");
const index = require("../databases/index.json");
const products = require("../databases/business/products.json");
const { minibar } = require("../lib/complements.js");
const { create } = require("../models/users.js");
const categories = require("../databases/business/productsCategories.json");
const { toCOP } = require("../lib/formats.js");

const db = require("../database/models/index.js");
const Op = db.Sequelize.Op;

const functions = require("../lib/functions.js");

const home = async (req, res) => {
  index.title = "home";

  let productsMasComprados = []; /*functions.recortarTamanioDeUnArreglo(
    [...products].sort((a, b) => b.buyes - a.buyes), //Se ordenan por productos mas comprados
    3 //Cantidad de sliders a mostrar
  );*/

  let productsOfertas = []; /*functions.recortarTamanioDeUnArreglo(
    [...products]
      .map((product) => {
        if (product.discount > 0) {
          return product;
        }
      })
      .sort((a, b) => b.discount - a.discount), //Productos con ofertas de mayor a menor
    3 //Cantidad de sliders a mostrar
  );*/
  let categories = [];
  let mainImages = [];
  let idProducts = [];

  try {
    productsMasComprados = await db.Product.findAll({
      order: [["unitsSelled", "ASC"]],
      limit: 3,
    });
    idProducts = productsMasComprados.map((product) => {
      return product.id;
    });

    mainImages = await db.ProductImages.findAll({
      where: {
        productId: { [Op.in]: idProducts },
      },
    });

    productsMasComprados.forEach((product) => {
      product.mainImage = mainImages.find(
        (image) => image.productId == product.id
      );
    });

    productsOfertas = await db.Product.findAll({
      where: { discount: { [Op.gt]: 0 } },
      order: [["discount", "ASC"]],
      limit: 3,
    });
    idProducts = productsOfertas.map((product) => {
      return product.id;
    });

    mainImages = await db.ProductImages.findAll({
      where: {
        productId: { [Op.in]: idProducts },
      },
    });

    productsOfertas.forEach((product) => {
      product.mainImage = mainImages.find(
        (image) => image.productId == product.id
      );
    });
    categories = await db.ProductCategory.findAll();
  } catch (error) {
    console.error(error);
    throw error;
  }

  try {
    await res.render("index.ejs", {
      settingGeneral,
      index,
      productsMasComprados,
      productsOfertas,
      categories,
      toCOP,
    });
  } catch (error) {
    throw error;
  }
};

const login = async (req, res) => {
  index.title = "login";
  try {
    await res.render("login.ejs", {
      settingGeneral,
      index,
      minibar,
    });
  } catch (error) {
    throw error;
  }
};

const createUser = async (req, res) => {
  try {
    create(req.body);
    res.redirect("/login");
  } catch (error) {
    throw error;
  }
};

const showCreateUser = async (req, res) => {
  try {
    await res.render("createUser.ejs", {
      settingGeneral,
      index,
      minibar,
    });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  home,
  login,
  showCreateUser,
  createUser,
};
