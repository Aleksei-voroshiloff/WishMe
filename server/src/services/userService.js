const { Op } = require('sequelize');
const allModels = require('../../db/models');

class UserService {
  constructor(model) {
    this.model = model;
  }

  findOneUser(id) {
    return this.model.User.findByPk(id);
  }

  async updateUser(id, updateData) {
    await this.model.User.update(updateData, { where: { id } });
    const updateUserInfo = await this.model.User.findByPk(id);
    return updateUserInfo;
  }

  getUserByWishlist(id) {
    return this.model.Wishlist.findOne({
      where: { id },
      include: [
        { model: this.model.User, attributes: ['id', 'name', 'avatar', 'birthday'] },
      ],
    });
  }

  async findAllUsers(search) {
    if (search && search.trim().length > 0) {
      return this.model.User.findAll({
        where: {
          name: {
            [Op.iLike]: `%${search}%`,
          },
        },
        attributes: ['id', 'name', 'avatar', 'birthday'],
      });
    }

    return [];
  }
}

const userService = new UserService(allModels);
module.exports = userService;
