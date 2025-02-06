const allModels = require('../../db/models');

class PresentService {
  constructor(model) {
    this.model = model;
  }

  // async findPresentFriend(userId) {
  //   const response = await this.model.Present.findAll({ where: { userId } });
  //   const presents = Array.from(new Set(response.map((present) => present.wishId)));
  //   const wishes = await this.model.Wish.findAll();
  //   const presentForFriend = presents.map((present) =>
  //     wishes.filter((wish) => wish.id === present),
  //   );
  //   return presentForFriend;
  // }

  findAllPresent(id) {
    return this.model.Present.findOne({ where: { wishId: id } });
  }

  addPresent({ id, userId }) {
    return this.model.Present.create({
      wishId: id,
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
