'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Wishlist, Wish }) {
      this.hasMany(Wishlist, { foreignKey: 'userId' });
      this.belongsToMany(User, {
        as: 'Friend',
        through: 'Friends',
        foreignKey: 'userId',
        otherKey: 'friendId',
      });
      // this.belongsToMany(Wish, {
      //   through: 'Archives',
      //   foreignKey: 'userId',
      //   as: 'wishAuthor',
      // });
      this.belongsToMany(Wish, {
        through: 'Presents',
        foreignKey: 'userId',
        as: 'wishGivers',
      });
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      password: DataTypes.STRING,
      birthday: DataTypes.DATEONLY,
      avatar: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'User',
    },
  );
  return User;
};
