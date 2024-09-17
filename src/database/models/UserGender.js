/**
 * UserGender model representation
 * @param {import("sequelize").Sequelize} sequelize 
 * @param {import("sequelize").DataTypes} DataTypes 
 * @returns Sequelize UserGender model
 */
module.exports = (sequelize, DataTypes) => {
  
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
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
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
  const UserGender = sequelize.define(alias, cols, config);

  //------------------------- Relationship
  UserGender.associate = function(models) {

    UserGender.hasMany(models.User, {
      as: "users",
      foreignKey: "genderId"
    });

  }

  //------------------------- Return
  return UserGender;
};