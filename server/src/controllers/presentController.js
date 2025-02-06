/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */

const presentService = require('../services/presentService');
const { Present } = require('../../db/models');

class PresentController {
  // getPresentForFriend = async (req, res) => {
  //   try {
  //     const userId = res.locals.user.id;
  //     const presentFor = await presentService.findPresentFriend(userId);
  //     return presentFor
  //   } catch (error) {
  //     res.status(500).json({ message: 'Ошибка сервера get' });
  //     console.log(error);
  //   }
  // };

  getAllpresent = async (req, res) => {
    try {
      const { id } = req.params;
      const allpresent = await presentService.findAllPresent(id);
      res.json(allpresent);
    } catch (error) {
      res.status(500).json({ message: 'Ошибка сервера get' });
      console.log(error);
    }
  };

  createPresent = async (req, res) => {
    try {
      const userId = res.locals.user.id;
      const { id } = req.params; // Получаем wishId из тела запроса

      // if (!wishId) {
      //   return res.status(400).json({ message: 'wishId is required' });
      // }

      const newPresent = await presentService.addPresent({ id, userId });
      res.status(201).json(newPresent);
    } catch (error) {
      res.status(500).json({ message: 'Ошибка сервера post' });
      console.log(error);
    }
  };

  deletePresent = async (req, res) => {
    try {
      const userId = res.locals.user.id;
      console.log(req.params);
      const { id } = req.params;
      const onePres = await Present.findOne({ where: { wishId: id } });
      if (onePres.userId !== userId) {
        return res.status(403).json({ message: 'Нет доступа' });
      }
      await presentService.deletePresent(onePres.id);
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ message: 'Ошибка сервера delete' });
      console.log(error);
    }
  };
}

const presentController = new PresentController();
module.exports = presentController;
