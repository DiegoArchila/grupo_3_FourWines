const { encrypt, comparePassword } = require("../../lib/formats.js");

/**
 * User model representation
 * @param {import("sequelize").Sequelize} sequelize 
 * @param {import("sequelize").DataTypes} DataTypes 
 * @returns Sequelize User model
 */
module.exports = (sequelize, DataTypes) => {
  
  //Set the Alias
  const alias = "User";

  //Sets the columns
  const cols = {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    dateBorn: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    genderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    imagen: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    pwd: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    isAdmin: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0      
    },
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  };

  //Sets configurations the from model or table
  const config = {
    tableName: "users",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: false,
    hooks:{
      beforeCreate: async (user) => {
        user.pwd = await encrypt(user.pwd);
      }
    }
  };

  //------------------------- Asignation
  const User = sequelize.define(alias, cols, config);
  
  /**
 * Function to compare PWD
 * @param {*} pwdString 
 * @returns 
 */
    User.prototype.validPwd= function (pwdString) {
    return comparePassword(pwdString, this.pwd);
  }


  //------------------------- Relationship
  User.associate = function (models) {
    
    User.hasMany(models.UserPhone, {
      as: "phones",
      foreignKey: "userId",
    });

    User.hasMany(models.UserEmail, {
      as: "emails",
      foreignKey: "userId",
    });

    User.belongsTo(models.UserGender, {
      as: "genders",
      foreignKey:"genderId"
    });

    User.hasMany(models.UserLocation, {
      as: "locations",
      foreignKey:"userId"
    });

    User.hasMany(models.UserCart, {
      as: "cartsUsers",
      foreignKey: "userId"
    });

    User.hasMany(models.Cart, {
      as: "userCarts",
      foreignKey: "userId"
    });

  };

  //------------------------- Return
  return User;
  
};