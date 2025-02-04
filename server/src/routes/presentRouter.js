const express = require('express');
const presentController = require('../controllers/presentController');
const presentRouter = express.Router();

presentRouter
  .route('/:id')
  .get(presentController.getAllpresent)



module.exports = presentRouter;
