/**
 * UserCart model representation
 * @param {import("sequelize").Sequelize} sequelize 
 * @param {import("sequelize").DataTypes} DataTypes 
 * @returns Sequelize UserCart model
 */
module.exports = (sequelize, DataTypes) => {
  
    //Set the Alias
    const alias = "UserCart";
  
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
      cartId: {
        type: DataTypes.INTEGER,
        allowNull:false
      },
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE
    };
  
    //Sets configurations the from model or table
    const config = {
      tableName: "usersCart",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: false,
    };
  
    //------------------------- Asignation
    const UserCart = sequelize.define(alias, cols, config);
    
    //------------------------- Relationship
    UserCart.associate = function (models) {
      
      UserCart.belongsTo(models.User, {
        as: "usersCarts",
        foreignKey: "userId"
      });
  
    };
  
    //------------------------- Return
    return UserCart;
    
  };