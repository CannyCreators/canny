const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create our Location model
class Locations extends Model {}

// create fields/columns for Location model
Locations.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    location_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'locations'
  }
);

module.exports = Locations;