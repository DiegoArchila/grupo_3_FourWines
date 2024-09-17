/**
 * ProductCategory model representation
 * @param {import("sequelize").Sequelize} sequelize 
 * @param {import("sequelize").DataTypes} DataTypes 
 * @returns Sequelize ProductCategory model
 */
module.exports = (sequelize, DataTypes) => {
  //Set the Alias
  const alias = "ProductCategory";

  //Sets the columns
  const cols = {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    notes: {
      type: DataTypes.STRING(255),
    },
  };

  //Sets configurations the from model or table
  const config = {
    tableName: "productsCategory",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: false,
  };

  const ProductCategory = sequelize.define(alias, cols, config);

  //------------------------- Relationship
  ProductCategory.associate = function (models) {
    ProductCategory.hasMany(models.Product, {
      foreignKey: "categoryId",
      as: "products",
    });
  };

  //------------------------- Asignation
  return ProductCategory;
};
