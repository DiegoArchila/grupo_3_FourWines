/**
 * UserLocation model representation
 * @param {import("sequelize").Sequelize} sequelize 
 * @param {import("sequelize").DataTypes} DataTypes 
 * @returns Sequelize UserLocation model
 */
module.exports= (sequelize, DataTypes) => {
  
  //Set the Alias
  const alias = "UserLocation";

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
    provinceState: {
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
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
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
  const UserLocation = sequelize.define(alias, cols, config);

  //------------------------- Relationship
  UserLocation.associate = function (models) {
    
    UserLocation.belongsTo(models.User, {
      as: "locationUsers",
      foreignKey: "userId",
    });

    UserLocation.belongsTo(models.Order,{
      as: "orderLocation",
      foreignKey: "userLocationId"
    });

  };

  //------------------------- Return
  return UserLocation;

};