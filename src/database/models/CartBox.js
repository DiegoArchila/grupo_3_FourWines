/**
 * CartBox model representation
 * @param {import("sequelize").Sequelize} sequelize 
 * @param {import("sequelize").DataTypes} DataTypes 
 * @returns Sequelize CartBox model
 */
module.exports = (sequelize, DataTypes) => {
  
    //Set the Alias
    const alias = "CartBox";
  
    //Sets the columns
    const cols = {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull:false
      },
      cartId: {
        type: DataTypes.INTEGER,
        allowNull:false
      },
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE
    };
  
    //Sets configurations the from model or table
    const config = {
      tableName: "cartBox",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: false,
    };
  
    //------------------------- Asignation
    const CartBox = sequelize.define(alias, cols, config);
    
    //------------------------- Relationship
    CartBox.associate = function (models) {
      
      
  
    };
  
    //------------------------- Return
    return CartBox;
    
  };