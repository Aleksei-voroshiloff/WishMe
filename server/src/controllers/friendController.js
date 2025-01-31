/* eslint-disable no-console */
const friendService = require('../services/friendService');

class FriendController {
  constructor() {
    this.service = friendService;
  }

  getAllFriend = async (req, res) => {
    try {
      const userId = res.locals.user.id
      console.log(userId)
      const allFriend = await this.service.findAllFriend(userId);
      // console.log(allFriend[1].Receiver);
      console.log(JSON.parse(JSON.stringify(allFriend)))
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
    } catch (error) {
      res.json({ message: 'Ошибка при delite друзей' });
      console.log(error);
    }
  };
}

const friendController = new FriendController();
module.exports = friendController;
