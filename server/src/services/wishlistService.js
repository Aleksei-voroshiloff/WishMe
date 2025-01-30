const allModels = require('../../db/models');

class WishlistService {
  constructor(model) {
    this.model = model;
  }

  getAllWishlist() {
    return this.model.Wishlist.findAll({ order: [['id', 'DESC']] });
  }

  async postWishlist({ title, date, userId }) {
    if (!title || !date) {
      throw new Error('Не все поля заполнены');
    }
    const newWishlist = await this.model.Wishlist.create({ title, date, userId });
    return newWishlist;
  }

  async updateWishlist({ id }, { title, date }) {
    await this.model.Wishlist.update({ title, date }, { where: { id } });
    const updateWl = await this.model.Wishlist.findByPk(id);
    return updateWl;
  }

  async deleteWishList(id) {
    await this.model.Wishlist.destroy({ where: { id } });
  }
}

const wishlistService = new WishlistService(allModels);
module.exports = wishlistService;
