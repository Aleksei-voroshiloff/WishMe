const express = require('express');
const { verifyAccessToken } = require('../middlewares/verifyTokens');
const friendController = require('../controllers/friendController');
const friendRouter = express.Router();

friendRouter.route('/').get(verifyAccessToken, friendController.getAllFriend);

friendRouter.route('/:id').delete(friendController.deleteFriend);

module.exports = friendRouter;
