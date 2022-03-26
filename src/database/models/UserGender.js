//------------------------- Imports
const { Sequelize, DataTypes } = require("sequelize");

//------------------------- Settings
const UserGender = (sequelize) => {
  //Set the Alias
  const alias = "UserGender";

  //Sets the columns
  const cols = {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING(64),
      allowNull: false,
      unique: true,
    },
    notes: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  };

  //Sets configurations the from model or table
  const config = {
    tableName: "usersGender",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: false,
  };

  //------------------------- Asignation
  return sequelize.define(alias, cols, config);
};

//------------------------- Relationship

//------------------------- Return
module.exports = UserGender;
