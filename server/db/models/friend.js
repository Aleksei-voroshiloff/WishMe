'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Friend extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User }) {
      this.belongsTo(User, { foreignKey: 'userId', as: 'Requester' });
      this.belongsTo(User, { foreignKey: 'friendId', as: 'Receiver' });
    }
  }
  Friend.init({
    userId: DataTypes.INTEGER,
    friendId: DataTypes.INTEGER,
    status: DataTypes.ENUM('pending', 'accepted', 'blocked')
  }, {
    sequelize,
    modelName: 'Friend',
  });
  return Friend;
};