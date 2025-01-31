const allModels = require('../../db/models');

class FriendService {
  constructor(model) {
    this.model = model;
  }
}

const friendService = new FriendService(allModels);
module.exports = friendService;
