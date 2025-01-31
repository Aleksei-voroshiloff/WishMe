const express = require('express');
const wishController = require('../controllers/wishController');
const wishRouter = express.Router();

wishRouter.route('/').get(wishController.getAllWish).post(wishController.postWish);

wishRouter
  .route('/:id')
  .get(wishController.getOneWish)
  .put(wishController.updateWish)
  .delete(wishController.deleteWish);
module.exports = wishRouter;
