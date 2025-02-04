/* eslint-disable no-console */
const fileService = require('../services/fileService');
const userService = require('../services/userService');

class UserController {
  constructor() {
    this.service = userService;
  }

  getOneUser = async (req, res) => {
    try {
      const { id } = req.params;
      const oneUser = await this.service.findOneUser(id);
      const { password, createdAt, updatedAt, ...userData } = oneUser.toJSON();
      res.json(userData);
    } catch (error) {
      res.json({ message: 'Ошибка при выведении друзей' });
      console.log(error);
    }
  };

  updateUser = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, phoneNumber, birthday } = req.body;
      console.log(req.file)
      console.log(req.file)
      const updateData = { name, phoneNumber, birthday };
      if (req.file) {
        const fileName = await fileService.createImage(req.file.buffer);
        updateData.avatar = fileName;
      }
      const updUser = await this.service.updateUser(id, updateData);
      const { password, createdAt, updatedAt, ...filterData } = updUser.toJSON();
      return res.json(filterData);
    } catch (error) {
      console.log(error);
      return res.json({ message: 'Ошибка при выведении друзей' });
    }
  };
}

const userController = new UserController();
module.exports = userController;
