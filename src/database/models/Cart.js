/**
 * Cart model representation
 * @param {import("sequelize").Sequelize} sequelize 
 * @param {import("sequelize").DataTypes} DataTypes 
 * @returns Sequelize Cart model
 */
module.exports = (sequelize, DataTypes) => {
  
    //Set the Alias
    const alias = "Cart";
  
    //Sets the columns
    const cols = {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull:false
      },
      total: {
        type: DataTypes.BIGINT,
        allowNull:false
      },
      stateId: {
        type: DataTypes.INTEGER,
        allowNull:false
      },
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE
    };
  
    //Sets configurations the from model or table
    const config = {
      tableName: "carts",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: false,
    };
  
    //------------------------- Asignation
    const Cart = sequelize.define(alias, cols, config);
    
    //------------------------- Relationship
    Cart.associate = function (models) {
      
      Cart.belongsToMany(models.Product,{
        as: "productsCart",
        through: "CartBox",
        foreignKey: "cartId",
        otherKey: "productId"
      });

      Cart.belongsTo(models.User, {
        as: "cartsUser",
        foreignKey:"userId"
      });

      Cart.belongsTo(models.CartState, {
        as: "stateCart",
        foreignKey: "stateId"
      });

      Cart.belongsTo(models.Order,{
        as: "order",
        foreignKey: "cartId"
      });

    };
  
    //------------------------- Return
    return Cart;
    
  };