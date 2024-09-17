/**
 * UserEmil model representation
 * @param {import("sequelize").Sequelize} sequelize 
 * @param {import("sequelize").DataTypes} DataTypes 
 * @returns Sequelize UserEmail model
 */
module.exports = (sequelize, DataTypes) => {
  
  //Set the Alias
  const alias = "UserEmail";

  //Sets the columns
  const cols = {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    categoryId: {
      type: DataTypes.INTEGER,
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
    tableName: "usersEmails",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: false,
  };

  //------------------------- Asignation
  const UserEmail = sequelize.define(alias, cols, config);

  //------------------------- Relationship
  UserEmail.associate = function (models) {
    
    UserEmail.belongsTo(models.EmailCategory, {
      as: "category",
      foreignKey: "categoryId",
    });

    UserEmail.belongsTo(models.User, {
      as: "userEmails",
      foreignKey: "userId",
    });
  };

  //------------------------- Return
  return UserEmail;

};