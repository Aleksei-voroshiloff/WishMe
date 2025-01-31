const express = require('express');
const { verifyAccessToken } = require('../middlewares/verifyTokens');
const friendController = require('../controllers/friendController');
const friendRouter = express.Router();

friendRouter
  .route('/:id')
  .get(verifyAccessToken, friendController.getAllFriend)
  .delete(friendController.deleteFriend);

module.exports = friendRouter;
