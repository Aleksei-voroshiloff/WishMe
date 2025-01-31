'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Wish extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Wishlist }) {
      this.belongsTo(Wishlist, { foreignKey: 'wishListId' });
      // this.belongsToMany(User, {
      //   through: 'Archives',
      //   foreignKey: 'wishId',
      //   as: 'userArchived',
      // });
      this.belongsToMany(User, {
        through: 'Presents',
        foreignKey: 'wishId',
        as: 'wishToGive',
      });
    }
  }
  Wish.init(
    {
      title: DataTypes.STRING,
      file: DataTypes.TEXT,
      wishUrl: DataTypes.TEXT,
      wishListId: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
      isArchived: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'Wish',
    },
  );
  return Wish;
};
