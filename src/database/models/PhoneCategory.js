/**
 * PhoneCategory model representation
 * @param {import("sequelize").Sequelize} sequelize 
 * @param {import("sequelize").DataTypes} DataTypes 
 * @returns Sequelize PhoneCategory model
 */
module.exports = (sequelize, DataTypes) => {
  
  //Set the Alias
  const alias = "PhoneCategory";

  //Sets the columns
  const cols = {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    notes: {
      type: DataTypes.STRING(250),
    },
  };

  //Sets configurations the from model or table
  const config = {
    tableName: "phonesCategory",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: false,
  };

  //------------------------- Asignation
  const PhoneCategory = sequelize.define(alias, cols, config);

  //------------------------- Relationship
  PhoneCategory.associate = function (models){
    
    PhoneCategory.hasMany(models.UserPhone, {
      as: "userPhones",
      foreignKey: "categoryId"
    })
  };

  //------------------------- Return
  return PhoneCategory;

};