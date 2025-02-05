const allModels = require('../../db/models');

class PresentService {
  constructor(model) {
    this.model = model;
  }

  async findPresentFriend(userId) {
    const response = await this.model.Present.findAll({ where: { userId } });
    console.log(response)
    return response;
  }

  findAllPresent(id) {
    return this.model.Present.findOne({ where: { wishId: id } });
  }
}

const presService = new PresentService(allModels);
module.exports = presService;
