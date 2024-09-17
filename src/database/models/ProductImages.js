/**
 * ProductImages model representation
 * @param {import("sequelize").Sequelize} sequelize 
 * @param {import("sequelize").DataTypes} DataTypes 
 * @returns Sequelize ProductImages model
 */
const { Sequelize, DataTypes } = require("sequelize");

//------------------------- Settings
const ProductImages = (sequelize) => {
  //Set the Alias
  const alias = "ProductImages";

  //Sets the columns
  const cols = {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    isMain: {
      type: DataTypes.TINYINT,
    },
    imagenDescription: {
      type: DataTypes.STRING(255),
    },
    pathImagen: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  };

  //Sets configurations the from model or table
  const config = {
    tableName: "productsImages",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: false,
  };

  //------------------------- Asignation
  return sequelize.define(alias, cols, config);
};

//------------------------- Relationship
ProductImages.associations = function (models) {
  //Product
  ProductImages.belongsTo(models.Product, {
    as: "products",
  });
};
//------------------------- Return
module.exports = ProductImages;
