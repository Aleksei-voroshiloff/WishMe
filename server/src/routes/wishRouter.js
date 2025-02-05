const express = require('express');
const wishController = require('../controllers/wishController');
const { verifyAccessToken } = require('../middlewares/verifyTokens');
const wishRouter = express.Router();

wishRouter.route('/').get(wishController.getAllWish).post(wishController.postWish);
wishRouter.route('/busy').get(verifyAccessToken, wishController.getWishFriend);
wishRouter
  .route('/:id')
  .get(wishController.getOneWish)
  .put(wishController.updateWish)
  .delete(wishController.deleteWish);
module.exports = wishRouter;
