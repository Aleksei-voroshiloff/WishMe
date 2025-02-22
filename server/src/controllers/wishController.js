/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */

const wishService = require('../services/wishServices');

class WishController {
  getWishFriend = async (req, res) => {
    try {
      const userId = res.locals.user.id;
      const friendWish = await wishService.getWishesByUser(userId);
      res.json(friendWish);
    } catch (error) {
      res.status(500).json({ message: 'Ошибка сервера запрос занятых подарков' });
      console.log(error);
    }
  };

  getAllWish = async (req, res) => {
    try {
      const { wishListId } = req.query;
      const allWish = await wishService.findAllWish(wishListId);
      res.json(allWish);
    } catch (error) {
      res.status(500).json({ message: 'Ошибка сервера get' });
      console.log(error);
    }
  };

  getOneWish = async (req, res) => {
    try {
      const { id } = req.params;
      const oneWish = await wishService.findOneWish(id);
      res.json(oneWish);
    } catch (error) {
      res.status(500).json({ message: 'Ошибка сервера get' });
      console.log(error);
    }
  };

  postWish = async (req, res) => {
    try {
      const { title, file, wishUrl, price, wishListId } = req.body;
      const newWish = await wishService.createWish({
        title,
        file,
        wishUrl,
        price,
        wishListId,
      });
      res.json(newWish);
    } catch (error) {
      res.status(500).json({ message: 'Ошибка сервера post' });
      console.log(error);
    }
  };

  updateWish = async (req, res) => {
    try {
      const { id } = req.params;
      const { title, file, wishUrl, price, wishListId } = req.body;
      const updateWish = await wishService.updateWish(
        { id },
        { title, file, wishUrl, price, wishListId },
      );
      res.json(updateWish);
    } catch (error) {
      res.status(500).json({ message: 'Ошибка сервера update' });
      console.log(error);
    }
  };

  deleteWish = async (req, res) => {
    try {
      const { id } = req.params;
      await wishService.destroyWish(id);
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ message: 'Ошибка сервера dalete' });
      console.log(error);
    }
  };
}

const wishController = new WishController();
module.exports = wishController;
