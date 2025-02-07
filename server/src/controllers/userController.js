/* eslint-disable no-console */
const fileService = require('../services/fileService');
const userService = require('../services/userService');

class UserController {
  constructor() {
    this.service = userService;
  }

  getMyData = async (req, res) => {
    try {
      const { id } = req.params;
      const oneUser = await this.service.findOneUser(id);
      const planeOneUser = oneUser.get();
      delete planeOneUser.password;
      return res.status(200).json(planeOneUser);
    } catch (error) {
      console.log(error);
      return res.json({ message: 'Ошибка при выведении друзей' });
    }
  };

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

  findAllUsers = async (req, res) => {
    try {
      const { search } = req.query;
      const allUsers = await this.service.findAllUsers(search);
      return setTimeout(()=> {res.status(200).json(allUsers)}, 1000);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Ошибка при выведении друзей' });
    }
  };

  getUserByWhishlist = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await this.service.getUserByWishlist(id);
      res.status(200).json(user)
    } catch (error) {
      console.log(error)
      res.status(500).json({message: 'Ошибка при поиске пользователя через вишлист'})
    }
  }
}

const userController = new UserController();
module.exports = userController;
