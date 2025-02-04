/* eslint-disable no-console */
const friendService = require('../services/friendService');

class FriendController {
  constructor() {
    this.service = friendService;
  }

  getAllFriend = async (req, res) => {
    try {
      const userId = res.locals.user.id
      const allFriend = await this.service.findAllFriend(userId);
      res.json(allFriend);
    } catch (error) {
      res.json({ message: 'Ошибка при выведении друзей' });
      console.log(error);
    }
  };

  deleteFriend = async (req, res) => {
    try {
      const { id } = req.params;
      await this.service.destroyFriend(id);
      res.status(200).json({ message: 'Друг удален' });
    } catch (error) {
      console.log(error);
      res.json({ message: 'Ошибка при delite друзей' });
    }
  };
}

const friendController = new FriendController();
module.exports = friendController;
