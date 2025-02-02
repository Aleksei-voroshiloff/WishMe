const express = require('express');
const { verifyAccessToken } = require('../middlewares/verifyTokens');
const wishlistController = require('../controllers/wishlistControllers');
const wishlistRouter = express.Router();

wishlistRouter
  .route('/')
  .get(verifyAccessToken,wishlistController.getAllWl)
  .post(verifyAccessToken, wishlistController.postWl);

wishlistRouter
  .route('/:id')
  .get(wishlistController.getOneWl)
  .put(wishlistController.updateWl)
  .delete(wishlistController.deleteWishlist);

module.exports = wishlistRouter;
