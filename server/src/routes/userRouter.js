const express = require('express');
const userController = require('../controllers/userController');
const userRouter = express.Router();
const upload = require('../middlewares/multer');

userRouter
  .route('/:id')
  .get(userController.getOneUser)
  .put(upload.single('file'), userController.updateUser);

module.exports = userRouter;
