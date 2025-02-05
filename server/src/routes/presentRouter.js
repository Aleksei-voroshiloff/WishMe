const express = require('express');
const presentController = require('../controllers/presentController');
const { verifyAccessToken } = require('../middlewares/verifyTokens');
const presentRouter = express.Router();

presentRouter.route('/').get(verifyAccessToken, presentController.getPresentForFriend);
presentRouter.route('/:id').get(presentController.getAllpresent);

module.exports = presentRouter;
