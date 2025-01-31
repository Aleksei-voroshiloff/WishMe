/* eslint-disable no-unused-vars */

'use strict';

const bcrypt = require('bcrypt');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          name: 'Admin',
          phoneNumber: '12345678910',
          password: bcrypt.hashSync('123456', 10),
        },
      ],
      {},
    );
    await queryInterface.bulkInsert(
      'Wishlists',
      [
        {
          title: 'Подарки ДР',
          date: 2025.02.7,
          password: bcrypt.hashSync('123456', 10),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
