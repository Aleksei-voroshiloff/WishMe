/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */

const presentService = require('../services/presentService');
const {Present} = require('../../db/models');


class PresentController {
  getAllpresent = async (req, res) => {
    try {
      const { id } = req.params;
      console.log(id);
      const allpresent = await presentService.findAllPresent(id);
      // console.log(allpresent);
      res.json(allpresent);
    } catch (error) {
      res.status(500).json({ message: 'Ошибка сервера get' });
      console.log(error);
    }
  };

  createPresent = async (req, res) => {
    try {
      const userId = res.locals.user.id;
      const { wishId } = req.body; // Получаем wishId из тела запроса
    
    if (!wishId) {
      return res.status(400).json({ message: 'wishId is required' });
    }

      
      const newPresent = await presentService.addPresent({ wishId, userId });
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
      const onePres = await Present.findByPk(id)
 if (onePres.userId !== userId) {
        return res.status(403).json({ message: 'Нет доступа' });
      }
      await presentService.deletePresent({ id });
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ message: 'Ошибка сервера delete' });
      console.log(error);
    }
  };
}

const presentController = new PresentController();
module.exports = presentController;
