/**
 * Product model representation
 * @param {import("sequelize").Sequelize} sequelize 
 * @param {import("sequelize").DataTypes} DataTypes 
 * @returns Sequelize Product model
 */
module.exports = (sequelize, DataTypes) => {
  //Set the Alias
  const alias = "Product";

  //Sets the columns
  const cols = {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    productName: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    productDescription: {
      type: DataTypes.STRING(255),
    },
    sku: {
      type: DataTypes.STRING(64),
    },
    productTerminated: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.INTEGER,
    },
    priceGross: {
      type: DataTypes.BIGINT,
    },
    priceFinal: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    discount: {
      type: DataTypes.INTEGER,
    },
    unitsBuyes: {
      type: DataTypes.INTEGER,
    },
    unitsSelled: {
      type: DataTypes.INTEGER,
    },
    isActive: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    notes: {
      type: DataTypes.STRING(255),
    },
  };

  //Sets configurations the from model or table
  const config = {
    tableName: "products",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: false,
  };

  //------------------------- Asignation
  const Product = sequelize.define(alias, cols, config);

  //------------------------- Relationship
  Product.associate = function (models) {
    //ProductCategory
    Product.belongsTo(models.ProductCategory, {
      as: "category",
    });

    //ProductImages
    Product.hasMany(models.ProductImages, {
      foreignKey: "productId",
      as: "images",
    });

    //Tax
    Product.belongsToMany(models.Tax, {
      as: "taxes",
      through: "productsTaxes",
      foreignKey: "productId",
      otherKey: "taxeId",
    });

    Product.belongsToMany(models.Cart,{
      as: "productsCart",
      through: "CartBox",
      foreignKey: "productId",
      otherKey: "cartId"
    });


  };

  return Product;
};
