//------------------------- Imports
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize({dialect:"mysql"});

//------------------------- Settings
const UserLocation = () => {
  //Set the Alias
  const alias = "UserPhone";

  //Sets the columns
  const cols = {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    ProvinceState: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    cityTown: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    addressLine: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    notes: {
      type: DataTypes.STRING(250),
    },
    isMain: {
      type: DataTypes.TINYINT,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    notes: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
  };

  //Sets configurations the from model or table
  const config = {
    tableName: "usersLocations",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: false,
  };

  //------------------------- Asignation
  return sequelize.define(alias, cols, config);
};

//------------------------- Relationship
UserLocation.associations = function (models) {
  UserLocation.belongsTo(models.User, {
    as: "users",
    foreignKey: "userId",
  });
};

//------------------------- Return
module.exports = UserLocation;
