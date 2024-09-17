/**
 * ProductTax model representation
 * @param {import("sequelize").Sequelize} sequelize 
 * @param {import("sequelize").DataTypes} DataTypes 
 * @returns Sequelize ProductTax model
 */
const { Sequelize, DataTypes } = require("sequelize");

//------------------------- Settings
const Tax = (sequelize) => {
  //Set the Alias
  const alias = "Tax";

  //Sets the columns
  const cols = {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    taxeName: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    taxeDescription: {
      type: DataTypes.STRING(255)
    },
    taxeValue: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    isActive: {
      type: DataTypes.TINYINT
    },
    notes: {
      type: DataTypes.STRING(255)
    },
  };

  //Sets configurations the from model or table
  const config = {
    tableName: "taxes",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: false,
  };

  //------------------------- Asignation
  return sequelize.define(alias, cols, config);
};

//------------------------- Relationship
Tax.associate = (models) => {
  //Product
  Product.belongsToMany(models.Product, {
    through: "productsTaxes",
    foreignKey: "taxeId",
    otherKey: "productId",
  });
};

//------------------------- Return
module.exports = Tax;
