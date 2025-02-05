const allModels = require('../../db/models');

class WishService {
  constructor(model) {
    this.model = model;
  }

  async getWishesByUser(userId) {
    const wishes = await this.model.Wish.findAll({
      include: [
        {
          model: this.model.User,
          as: 'wishToGive',
          where: { id: userId },
        },
      ],
    });
    const wishlistId = wishes.map((wishL) => wishL.wishListId);
    const result = await this.model.User.findAll({
      include: {
        model: this.model.Wishlist,
        where: { id: wishlistId },
      },
    });

    return { wishes, result };
  }

  findAllWish(wishListId) {
    return this.model.Wish.findAll({ order: [['id', 'DESC']], where: { wishListId } });
  }

  findOneWish(id) {
    return this.model.Wish.findByPk(id);
  }

  async createWish({ title, file, wishUrl, price, wishListId }) {
    if (!title || !file || !wishUrl || !price || !wishListId) {
      throw new Error('Не все поля заполнены');
    }
    const newWish = await this.model.Wish.create({
      title,
      file,
      wishUrl,
      price,
      wishListId,
    });
    return newWish;
  }

  async updateWish({ id }, { title, file, wishUrl, price, wishListId, isArchived }) {
    await this.model.Wish.update(
      {
        title,
        file,
        wishUrl,
        price,
        wishListId,
        isArchived: isArchived !== false ? isArchived : false,
      },
      { where: { id } },
    );
    const updateData = await this.model.Wish.findByPk(id);
    return updateData;
  }

  async destroyWish(id) {
    await this.model.Wish.destroy({ where: { id } });
  }
}

const wishService = new WishService(allModels);
module.exports = wishService;
