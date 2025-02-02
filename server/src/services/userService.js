const allModels = require('../../db/models');

class UserService {
  constructor(model) {
    this.model = model;
  }

  findOneUser(id) {
    return this.model.User.findByPk(id);
  }

  async updateUser(id, updateData) {
    await this.model.User.update({ where: { id } }, updateData);
    const updateUserInfo = await this.model.User.findByPk(id);
    return updateUserInfo;
  }
}

const userService = new UserService(allModels);
module.exports = userService;
