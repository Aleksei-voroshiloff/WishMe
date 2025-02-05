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

  async addFriend(userId, friendId) {
    const existingFriendshipReceiver = await this.model.Friend.findOne({
      where: { userId, friendId },
    });
    const existingFriendshipRequester = await this.model.Friend.findOne({
      where: { userId: friendId, friendId: userId },
    });
    if (existingFriendshipReceiver || existingFriendshipRequester) {
      throw new Error('Дружба уже существует');
    }
    await this.model.Friend.create({
      userId,
      friendId,
      status: 'pending',
    });

    const friendReceiver = await this.model.User.findByPk(friendId);
    
    return friendReceiver;
  }

  async acceptFriend(userId, friendId) {
    const requester = await this.model.Friend.findOne({
      where: { userId: friendId, friendId: userId, status: 'pending' },
    });
    if (!requester) {
      throw new Error('Заявка не найдена');
    }
    await requester.update({ status: 'accepted' });

    await this.model.create({userId, friendId, status: 'accepted' });

    const newFriend = await this.model.User.findByPk(friendId);

    return newFriend;
  }

  findAllRequestsToFriend(userId) {
    return this.model.Friend.findAll({
      where: { friendId: userId, status: 'pending' },
      include: [
        {
          model: this.model.User,
          as: 'Requester',
          attributes: ['id', 'name', 'birthday', 'avatar'],
        },
      ],
    });
  }

  findAllFriendRequests(userId) {
    return this.model.Friend.findAll({
      where: { userId, status: 'pending' },
      include: [
        {
          model: this.model.User,
          as: 'Receiver',
          attributes: ['id', 'name', 'birthday', 'avatar'],
        },
      ],
    });
  }
}

const friendService = new FriendService(allModels);
module.exports = friendService;
