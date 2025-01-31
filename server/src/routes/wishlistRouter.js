const express = require('express');
const { verifyAccessToken } = require('../middlewares/verifyTokens');
const wishlistController = require('../controllers/wishlistControllers');
const wishlistRouter = express.Router();

wishlistRouter
  .route('/')
  .get(wishlistController.getAllWl)
  .post(verifyAccessToken, wishlistController.postWl);

wishlistRouter
  .route('/:id')
  .put(wishlistController.updateWl)
  .delete(wishlistController.deleteWishlist);

module.exports = wishlistRouter;
