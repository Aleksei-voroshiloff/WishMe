'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Archive extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  Archive.init({
    userId: DataTypes.INTEGER,
    wishId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Archive',
  });
  return Archive;
};