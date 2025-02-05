const allModels = require('../../db/models');

class PresentService {
  constructor(model) {
    this.model = model;
  }

  async findPresentFriend(userId) {
    const response = await this.model.Present.findAll({ where: { userId }, include: {
      model: this.model.Wish,
      as: 'wushToGive'
    } });
   
    // const presents = response.map((present) => present.wishId);
    console.log(response);

  }

  findAllPresent(id) {
    return this.model.Present.findOne({ where: { wishId: id } });
  }

  addPresent({ wishId, userId }) {
    return this.model.Present.create({
      wishId,
      userId,
    });
  }

  deletePresent({ id }) {
    return this.model.Present.destroy({
      where: {
        id,
      },
    });
  }
}
const presService = new PresentService(allModels);
module.exports = presService;
