/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */

const friendService = require('../services/friendService');
const wishlistService = require('../services/wishlistService');

class WishlistController {
  getAllWl = async (req, res) => {
    try {
      const userId =res.locals.user.id
      const allWishlist = await wishlistService.getAllWishlist(userId);
      res.json(allWishlist);
    } catch (error) {
      res.status(500).json({ message: 'Ошибка сервера get' });
      console.log(error);
    }
  };

  getOneWl = async (req, res) => {
    try {
      const { id } = req.params;
      const oneWishlist = await wishlistService.getOneWishlist(id);
      res.json(oneWishlist);
    } catch (error) {
      res.status(500).json({ message: 'Ошибка сервера getOne' });
      console.log(error);
    }
  };

  getAllFriendWl = async (req, res) => {
    try {
      const {friendId} = req.params
      const userId =res.locals.user.id
      const friendship = await friendService.findFriendship(userId, friendId)
      if (!friendship) return res.status(403).json({message: 'Доступ запрещен'})
      const allWishlist = await wishlistService.getAllWishlist(friendId);
    return res.status(200).json(allWishlist)
    } catch (error) {
      console.log(error)
      return res.status(500).json({message: 'Ошибка сервера getAllFriendWl'})
    }
  }

  postWl = async (req, res) => {
    try {
      const userId = res.locals.user.id;
      const { title, date } = req.body;
      const newWishlist = await wishlistService.postWishlist({ title, date, userId });
      res.json(newWishlist);
    } catch (error) {
      res.status(500).json({ message: 'Ошибка сервера post' });
      console.log(error);
    }
  };

  updateWl = async (req, res) => {
    try {
      const { id } = req.params;
      const { title, date } = req.body;
      const updateWishlist = await wishlistService.updateWishlist(
        { id },
        { title, date },
      );
      res.json(updateWishlist);
    } catch (error) {
      res.status(500).json({ message: 'Ошибка сервера update' });
      console.log(error);
    }
  };

  deleteWishlist = async (req, res) => {
    try {
      const { id } = req.params;
      await wishlistService.deleteWishList(id);
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ message: 'Ошибка сервера dalete' });
      console.log(error);
    }
  };
}

const wishlistController = new WishlistController();
module.exports = wishlistController;
