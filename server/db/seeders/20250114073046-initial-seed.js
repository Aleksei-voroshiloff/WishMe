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
          name: 'Алексей',
          phoneNumber: '+7 (900) 000-11-22',
          password: bcrypt.hashSync('123456', 10),
          birthday: '2000-02-07',
        },
        {
          name: 'Андрей',
          phoneNumber: '+7 (901) 000-11-22',
          password: bcrypt.hashSync('123456', 10),
          birthday: '2001-11-22',
        },
        {
          name: 'Кенан',
          phoneNumber: '+7 (902) 000-11-22',
          password: bcrypt.hashSync('123456', 10),
          birthday: '2001-11-06',
        },
      ],
      {},
    );
    await queryInterface.bulkInsert(
      'Wishlists',
      [
        {
          title: 'Подарки ДР',
          date: '2025-02-07',
          userId: 1,
        },
        {
          title: 'НГ',
          date: '2025-12-31',
          userId: 2,
        },
        {
          title: 'Подарки 23 февраля',
          date: '2025-02-23',
          userId: 3,
        },
      ],
      {},
    );
    await queryInterface.bulkInsert(
      'Wishes',
      [
        {
          title: 'Носки эльбруса',
          file: 'https://21-shop.ru/upload/resize/148/148212478/2000x2000x90/noski-zaporozhets-elbrus-korotkie-biryuza.jpg',
          wishUrl:
            'https://21-shop.ru/catalog/aksessuary/noski/noski-zaporozhets-elbrus-korotkie.html',
          wishListId: 1,
          price: '203',
          isArchived: false,
        },
        {
          title: 'Ноутбук Apple MacBook Air 13 M3',
          file: 'https://img.mvideo.ru/Big/30071832bb.jpg',
          wishUrl:
            'https://www.mvideo.ru/products/noutbuk-apple-macbook-air-13-m3-8-core-10-core-16-512-starlight-mxcu3-30071832',
          wishListId: 1,
          price: '184999',
          isArchived: false,
        },
        {
          title: 'Игровая приставка Sony PlayStation 5',
          file: 'https://img.mvideo.ru/Big/40079650bb.jpg',
          wishUrl:
            'https://www.mvideo.ru/products/igrovaya-pristavka-sony-playstation-5-slim-1tb-blu-ray-edition-40079650',
          wishListId: 3,
          price: '67500',
          isArchived: false,
        },
        {
          title: 'Книга Гарри Поттер',
          file: 'https://ir.ozone.ru/s3/multimedia-1-o/wc1000/7015916004.jpg',
          wishUrl:
            'https://www.ozon.ru/product/garri-potter-rosmen-v-podarochnom-bokse-iz-7-knig-rouling-dzhoan-ketlin-1491788805/?at=6WtZW2pZ2S2mVDg7TQD81R0UDArpgncZrAxqvH1PKOkD&avtc=1&avte=4&avts=1738858169&keywords=%D0%BA%D0%BD%D0%B8%D0%B3%D0%B8+%D0%BF%D1%80%D0%BE+%D0%B3%D0%B0%D1%80%D1%80%D0%B8+%D0%BF%D0%BE%D1%82%D1%82%D0%B5%D1%80%D0%B0',
          wishListId: 3,
          price: '1000',
          isArchived: true,
        },
      ],
      {},
    );
    await queryInterface.bulkInsert(
      'Presents',
      [
        {
          userId: 1,
          wishId: 3,
        },
        {
          userId: 1,
          wishId: 4,
        },
        {
          userId: 2,
          wishId: 1,
        },
        {
          userId: 3,
          wishId: 2,
        },
      ],
      {},
    );
    await queryInterface.bulkInsert(
      'Friends',
      [
        {
          userId: 1,
          friendId: 2,
          status: 'accepted',
        },
        {
          userId: 2,
          friendId: 1,
          status: 'accepted',
        },
        {
          userId: 1,
          friendId: 3,
          status: 'accepted',
        },
        {
          userId: 3,
          friendId: 1,
          status: 'accepted',
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
