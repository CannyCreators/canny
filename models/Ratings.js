const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


class Ratings extends Model {}


Ratings.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    rating: {
      type: DataTypes.INTEGER,
      min: 1,
      max: 5,
      allowNull: false
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'ratings'
  }
);

module.exports = Ratings;