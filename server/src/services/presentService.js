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

  async findAllPresent(id) {
    const isBusy = await this.model.Present.findAll();
    return isBusy.some((pres) => pres.wishId === Number(id));
  }

  addPresent({ id, userId }) {
    return this.model.Present.create({
      wishId: id,
      userId,
    });
  }

  deletePresent(id) {
    return this.model.Present.destroy({
      where: {
        id,
      },
    });
  }

  findUserId(wishId) {
    return this.model.Present.findOne({
      where: { wishId },
      attributes: ['userId'],
    });
  }
}


const presService = new PresentService(allModels);
module.exports = presService;
