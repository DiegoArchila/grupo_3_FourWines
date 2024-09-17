/**
 * EmailCategory model representation
 * @param {import("sequelize").Sequelize} sequelize 
 * @param {import("sequelize").DataTypes} DataTypes 
 * @returns Sequelize EmailCategory model
 */
module.exports = (sequelize, DataTypes) => {

  //Set the Alias
  const alias = "EmailCategory";

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
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
    
  };

  //Sets configurations the from model or table
  const config = {
    tableName: "emailsCategory",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: false,
  };

  //------------------------- Asignation
  const EmailCategory=sequelize.define(alias, cols, config);

  //------------------------- Relationship
  EmailCategory.associate=function(models) {
    
    EmailCategory.hasMany(models.UserEmail, {
      as: "userEmails",
      foreignKey:"categoryId"
    });
    
  }
  
  //------------------------- Return
  return EmailCategory;

};