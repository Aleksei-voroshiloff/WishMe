const express = require('express');
const { verifyAccessToken } = require('../middlewares/verifyTokens');
const friendController = require('../controllers/friendController');
const friendRouter = express.Router();

friendRouter.route('/').get(verifyAccessToken, friendController.getAllFriend);

friendRouter.route('/requeststome').get(verifyAccessToken, friendController.findAllRequestsToFriend);
friendRouter.route('/myrequests').get(verifyAccessToken, friendController.findAllFriendRequests);

friendRouter
  .route('/:id')
  .delete(verifyAccessToken, friendController.deleteFriend)
  .post(verifyAccessToken, friendController.addFriend)
  .put(verifyAccessToken, friendController.acceptFriend);

module.exports = friendRouter;
