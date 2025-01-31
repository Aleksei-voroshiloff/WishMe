const allModels = require('../../db/models');

class FriendService {
  constructor(model) {
    this.model = model;
  }

  findAllFriend(userId) {
    return this.model.Friend.findAll({
      where: { userId },
      include: [
        {
          model: this.model.User,
          as: 'Receiver',
          attributes: ['id', 'name', 'birthday', 'avatar'],
        },
      ],
    });
  }

  async destroyFriend(id) {
    await this.model.Friend.destroy({ where: { friendId: id } });
  }
}

const friendService = new FriendService(allModels);
module.exports = friendService;
