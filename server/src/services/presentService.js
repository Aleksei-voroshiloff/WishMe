const allModels = require('../../db/models');

class PresentService {
  constructor(model) {
    this.model = model;
  }

  findAllPresent(id) {
    return this.model.Present.findOne({  where: { wishId: id } });
  }
}

const presService = new PresentService(allModels);
module.exports = presService;
