/**
 * CartState model representation
 * @param {import("sequelize").Sequelize} sequelize 
 * @param {import("sequelize").DataTypes} DataTypes 
 * @returns Sequelize CartState model
 */
module.exports = (sequelize, DataTypes) => {
  
    //Set the Alias
    const alias = "CartState";
  
    //Sets the columns
    const cols = {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      stateName: {
        type: DataTypes.STRING(64),
        allowNull:false
      },
      stateValue: {
        type: DataTypes.TINYINT,
        unique:true,
        allowNull:false
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
      tableName: "cartState",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: false,
    };
  
    //------------------------- Asignation
    const CartState = sequelize.define(alias, cols, config);
    
    //------------------------- Relationship
    CartState.associate = function (models) {
      
      CartState.hasMany(models.Cart, {
        as: "cartState",
        foreignKey: "stateId"
      });
  
    };
  
    //------------------------- Return
    return CartState;
    
  };