/* eslint-disable no-console */
const fileService = require('../services/fileService');
const userService = require('../services/userService');

class UserController {
  constructor() {
    this.service = userService;
  }

  getOneUser = async (req, res) => {
    try {
      const userId = res.locals.user.id;
      const { id } = req.params;
      if (userId === Number(id)) {
        return res.json({ message: 'Нет доступа' });
      }
      const oneUser = await this.service.findOneUser(id);
      const planeOneUser = oneUser.get();
      delete planeOneUser.password;
      delete planeOneUser.phoneNumber;
      return res.status(200).json(planeOneUser);
    } catch (error) {
      console.log(error);
      return res.json({ message: 'Ошибка при выведении друзей' });
    }
  };

  updateUser = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, phoneNumber, birthday } = req.body;
      const updateData = { name, phoneNumber, birthday };
      if (req.file) {
        const fileName = await fileService.createImage(req.file.buffer);
        updateData.avatar = fileName; // Устанавливаем значение для поля avatar
      } else {
        updateData.avatar = null;
      }
      const updUser = await this.service.updateUser(id, updateData);
      return res.json(updUser);
    } catch (error) {
      console.log(error);
      return res.json({ message: 'Ошибка при выведении друзей' });
    }
  };

  findAllUsers = async (req, res) => {
    try {
      const { search } = req.query;
      const allUsers = await this.service.findAllUsers(search);
      return res.status(200).json(allUsers);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Ошибка при выведении друзей' });
    }
  };
}

const userController = new UserController();
module.exports = userController;
