/**
 * UserPhone model representation
 * @param {import("sequelize").Sequelize} sequelize 
 * @param {import("sequelize").DataTypes} DataTypes 
 * @returns Sequelize UserPhone model
 */
module.exports = (sequelize, DataTypes) => {
  
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
    phone: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    notes: {
      type: DataTypes.STRING(250),
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  };

  //Sets configurations the from model or table
  const config = {
    tableName: "usersPhones",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: false,
  };

  //------------------------- Asignation
  const UserPhone = sequelize.define(alias, cols, config);

  //------------------------- Relationship
  UserPhone.associate = function (models) {

    UserPhone.belongsTo(models.PhoneCategory, {
      as: "phoneCategories",
      foreignKey: "categoryId",
    });

    UserPhone.belongsTo(models.User, {
      as: "users",
      foreignKey: "userId",
    });

  };

  //------------------------- Return
  return UserPhone;

};