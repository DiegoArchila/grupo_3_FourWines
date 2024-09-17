/**
 * Order model representation
 * @param {import("sequelize").Sequelize} sequelize 
 * @param {import("sequelize").DataTypes} DataTypes 
 * @returns Sequelize Order model
 */
module.exports = (sequelize, DataTypes) => {
  
    //Set the Alias
    const alias = "Order";
  
    //Sets the columns
    const cols = {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      orderDate: {
        type: DataTypes.DATEONLY,
        allowNull:false
      },
      cartId:{
        type: DataTypes.INTEGER,
        allowNull:false
      },
      userLocationId:{
        type: DataTypes.INTEGER,
        allowNull:false
      },
      guideTransport: {
        type: DataTypes.STRING(128),
        allowNull:true
      },
      notes: {
        type: DataTypes.STRING(255),
        allowNull:true
      },
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE
    };
  
    //Sets configurations the from model or table
    const config = {
      tableName: "orders",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: false,
    };
  
    //------------------------- Asignation
    const Order = sequelize.define(alias, cols, config);
    
    //------------------------- Relationship
    Order.associate = function (models) {
      
      Order.hasOne(models.Cart, {
        as: "cart",
        foreingKey: "cartId"
      });
      
      Order.hasOne(models.UserLocation, {
        as: "locationOrder",
        foreingKey: "userLocationId"
      });
    };
  
    //------------------------- Return
    return Order;
    
  };