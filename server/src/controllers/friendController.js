/* eslint-disable no-console */
const friendService = require('../services/friendService');

class FriendController {
  constructor() {
    this.service = friendService;
  }

  getAllFriend = async (req, res) => {
    try {
      const userId = res.locals.user.id;
      const allFriend = await this.service.findAllFriend(userId);
      res.json(allFriend);
    } catch (error) {
      res.json({ message: 'Ошибка при выведении друзей' });
      console.log(error);
    }
  };

  deleteFriend = async (req, res) => {
    try {
      const userId = res.locals.user.id;
      const { id } = req.params;
      await this.service.destroyFriend(userId, id);
      setTimeout(() => {
        res.status(200).json({ message: 'Друг удален' });
      }, 1000);
    } catch (error) {
      console.log(error);
      res.json({ message: 'Ошибка при delete друзей' });
    }
  };

  addFriend = async (req, res) => {
    try {
      const userId = res.locals.user.id;
      const { id } = req.params;
      const newFriend = await this.service.addFriend(userId, id);
      setTimeout(() => {
        res.status(201).json(newFriend);
      }, 1000);
    } catch (error) {
      console.log(error);
      setTimeout(() => {
        res.status(500).json({ message: 'Ошибка при добавлении друга' });
      }, 1000);
    }
  };

  acceptFriend = async (req, res) => {
    try {
      const userId = res.locals.user.id;
      const { id } = req.params;
      const newFriend = await this.service.acceptFriend(userId, id);
      setTimeout(() => {

        res.status(200).json(newFriend);
      }, 1000);
    } catch (error) {
      console.log(error);
      setTimeout(() => {
        res.status(500).json({ message: 'Ошибка при принятии заявки' });
      }, 1000);
    }
  };

  findAllRequestsToFriend = async (req, res) => {
    try {
      const userId = res.locals.user.id;
      const allPendingFriend = await this.service.findAllRequestsToFriend(userId);
      res.status(200).json(allPendingFriend);
    } catch (error) {
      console.log(error);
      res.json({ message: 'Ошибка при выведении заявок' });
    }
  };

  findAllFriendRequests = async (req, res) => {
    try {
      const userId = res.locals.user.id;
      const allPendingFriend = await this.service.findAllFriendRequests(userId);
      res.status(200).json(allPendingFriend);
    } catch (error) {
      console.log(error);
      res.json({ message: 'Ошибка при выведении заявок' });
    }
  };
}

const friendController = new FriendController();
module.exports = friendController;
