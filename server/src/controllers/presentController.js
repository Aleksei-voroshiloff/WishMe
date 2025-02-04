/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */

const presentService = require('../services/presentService');

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
}

const presentController = new PresentController();
module.exports = presentController;
