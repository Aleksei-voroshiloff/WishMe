const express = require('express');
const userController = require('../controllers/userController');
const userRouter = express.Router();
const upload = require('../middlewares/multer');
const { verifyAccessToken } = require('../middlewares/verifyTokens');

userRouter
  .route('/:id')
  .get(verifyAccessToken, userController.getOneUser)
  .put(upload.single('file'), userController.updateUser);

userRouter.route('/').get(userController.findAllUsers);

module.exports = userRouter;
