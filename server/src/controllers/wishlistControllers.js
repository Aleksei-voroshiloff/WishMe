/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */

const wishlistService = require('../services/wishlistService');

class WishlistController {
  getAllWl = async (req, res) => {
    try {
      const allWishlist = await wishlistService.getAllWishlist();
      res.json(allWishlist);
    } catch (error) {
      res.status(500).json({ message: 'Ошибка сервера get' });
      console.log(error);
    }
  };

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
    } catch (error) {
      res.status(500).json({ message: 'Ошибка сервера dalete' });
      console.log(error);
    }
  };
}

const wishlistController = new WishlistController();
module.exports = wishlistController;
