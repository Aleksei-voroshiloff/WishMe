const express = require('express');
const presentController = require('../controllers/presentController');
const { verifyAccessToken } = require('../middlewares/verifyTokens');
const presentRouter = express.Router();

presentRouter
  .route('/')
  // .get(verifyAccessToken, presentController.getPresentForFriend)
  // .post(verifyAccessToken, presentController.createPresent);

presentRouter
  .route('/:id')
  .post(verifyAccessToken, presentController.createPresent)
  .get(presentController.getAllpresent)
  .delete(verifyAccessToken, presentController.deletePresent);

module.exports = presentRouter;
