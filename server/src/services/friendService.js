const allModels = require('../../db/models');

class FriendService {
  constructor(model) {
    this.model = model;
  }

  findAllFriend(userId) {
    return this.model.Friend.findAll({
      where: { userId, status: 'accepted' },
      include: [
        {
          model: this.model.User,
          as: 'Receiver',
          attributes: ['id', 'name', 'birthday', 'avatar'],
        },
      ],
    });
  }

  findFriendship(userId, friendId) {
    return this.model.Friend.findOne({
      where: { userId, friendId, status: 'accepted' },
    });
  }

  async destroyFriend(id) {
    await this.model.Friend.destroy({ where: { friendId: id } });
    await this.model.Friend.destroy({ where: { userId: id } });
  }
}

const friendService = new FriendService(allModels);
module.exports = friendService;
