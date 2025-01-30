const allModels = require('../../db/models');

class WishService {
    constructor(model) {
        this.model = model;
    }


}

const wishService = new WishService(allModels);
module.exports = wishService