/**
 * ProductTax model representation
 * @param {import("sequelize").Sequelize} sequelize 
 * @param {import("sequelize").DataTypes} DataTypes 
 * @returns Sequelize ProductTax model
 */
const { Sequelize, DataTypes } = require("sequelize");

//------------------------- Settings
const ProductTaxes = (sequelize) => {
  //Set the Alias
  const alias = "ProductTaxes";

  //Sets the columns
  const cols = {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    taxeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  };

  //Sets configurations the from model or table
  const config = {
    tableName: "productsTaxes",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: false,
  };

  //------------------------- Asignation
  return sequelize.define(alias, cols, config);
};

//------------------------- Relationship
ProductTaxes.associations = function (models) {
  ProductTaxes.belongsTo(models.Product, {
    as: "products",
    foreignKey: "productId",
  });
  ProductTaxes.belongsTo(models.Tax, {
    as: "taxes",
    foreignKey: "taxeId",
  });
};
//------------------------- Return
module.exports = ProductTaxes;
