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
          birthday: '2000-02-07',
        },
        {
          name: 'Лексус',
          phoneNumber: '10987654321',
          password: bcrypt.hashSync('123456', 10),
          birthday: '2001-11-22',
        },
        {
          name: 'Кенан',
          phoneNumber: '11111111111',
          password: bcrypt.hashSync('123456', 10),
          birthday: '2001-11-06',
        },
        {
          name: 'Андрей',
          phoneNumber: '22222222222',
          password: bcrypt.hashSync('123456', 10),
          birthday: '2000-03-10',
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
          userId: 3,
        },

        {
          title: 'Донаты на лечение',
          date: '2025-02-07',
          userId: 2,
        },
        {
          title: ' 23 февраля ',
          date: '2025-02-07',
          userId: 4,
        },
        {
          title: ' свадьба ',
          date: '2025-02-07',
          userId: 2,
        },

        {
          title: 'Подарки 23 февраля',
          date: '2025-02-23',
          userId: 2,
        },
        {
          title: 'Подарки 8 марта',
          date: '2025-03-08',
          userId: 3,
        },
        {
          title: 'Вишлсит1111',
          date: '2025-03-08',
          userId: 1,
        },
        {
          title: 'Вишлсит2222',
          date: '2025-03-08',
          userId: 1,
        },
      ],
      {},
    );
    await queryInterface.bulkInsert(
      'Wishes',
      [
        {
          title: 'Танец Кенана',
          file: 'https://images.icecat.biz/img/gallery_raw/img_20109668_raw_1482459716_5228_3788.jpg',
          wishUrl: 'https://dance.kmti.ru/',
          wishListId: 3,
          price: '100',
          isArchived: false,
        },
        {
          title: 'Феррари',
          file: 'https://images.icecat.biz/img/gallery_raw/img_20109668_raw_1482459716_5228_3788.jpg',
          wishUrl:
            'https://auto.ru/cars/ferrari/all/?utm_referrer=https%3A%2F%2Fauto.ru%2Fcars%2Fferrari%2Fall%2F',
          wishListId: 4,
          price: '60000000',
          isArchived: false,
        },
        {
          title: 'PS5',
          file: '',
          wishUrl:
            'https://market.yandex.ru/catalog--konsoli-playstation-5/40910350/list',
          wishListId: 1,
          price: '60000',
          isArchived: false,
        },
        {
          title: 'Книга Гарри Поттер',
          file: '',
          wishUrl:
            'https://market.yandex.ru/search?text=%D0%B3%D0%B0%D1%80%D1%80%D0%B8%20%D0%BF%D0%BE%D1%82%D1%82%D0%B5%D1%80&hid=987260&hid=10683227&rs=eJwzcghgrGLh-LPA5hOjFAeDwMJDrBIMCkCuwu22HlYNIEMDxPjL2Hy40q6XSWj_J7upTLYc2-0WMbFZWpgbmRk4RXFpcbFxMErwKrAIsEvx5CamlMUXZ6TmpMUbKcy8yqkx9_RnRiN2DhAlwARVy6jACFTLnVyQGJ-Zl1xaEm-owKDBYMTLMaGhoeHDlvY5qxkFgNCLI83YwsTQ2DQxyMjQ3NjC2MDSyMLA3NhEPynVzCTN2DItySQpzSA52STR0DDZ2CAxKS3JKNnAzMBA31DfEADUGj8c&rt=9',
          wishListId: 2,
          price: '1000',
          isArchived: true,
        },
        {
          title: 'Книга Гарри',
          file: '',
          wishUrl:
            'https://market.yandex.ru/search?text=%D0%B3%D0%B0%D1%80%D1%80%D0%B8%20%D0%BF%D0%BE%D1%82%D1%82%D0%B5%D1%80&hid=987260&hid=10683227&rs=eJwzcghgrGLh-LPA5hOjFAeDwMJDrBIMCkCuwu22HlYNIEMDxPjL2Hy40q6XSWj_J7upTLYc2-0WMbFZWpgbmRk4RXFpcbFxMErwKrAIsEvx5CamlMUXZ6TmpMUbKcy8yqkx9_RnRiN2DhAlwARVy6jACFTLnVyQGJ-Zl1xaEm-owKDBYMTLMaGhoeHDlvY5qxkFgNCLI83YwsTQ2DQxyMjQ3NjC2MDSyMLA3NhEPynVzCTN2DItySQpzSA52STR0DDZ2CAxKS3JKNnAzMBA31DfEADUGj8c&rt=9',
          wishListId: 5,
          price: '100',
          isArchived: false,
        },
        {
          title: 'Поттер',
          file: '',
          wishUrl:
            'https://market.yandex.ru/search?text=%D0%B3%D0%B0%D1%80%D1%80%D0%B8%20%D0%BF%D0%BE%D1%82%D1%82%D0%B5%D1%80&hid=987260&hid=10683227&rs=eJwzcghgrGLh-LPA5hOjFAeDwMJDrBIMCkCuwu22HlYNIEMDxPjL2Hy40q6XSWj_J7upTLYc2-0WMbFZWpgbmRk4RXFpcbFxMErwKrAIsEvx5CamlMUXZ6TmpMUbKcy8yqkx9_RnRiN2DhAlwARVy6jACFTLnVyQGJ-Zl1xaEm-owKDBYMTLMaGhoeHDlvY5qxkFgNCLI83YwsTQ2DQxyMjQ3NjC2MDSyMLA3NhEPynVzCTN2DItySQpzSA52STR0DDZ2CAxKS3JKNnAzMBA31DfEADUGj8c&rt=9',
          wishListId: 5,
          price: '500',
          isArchived: false,
        },
        {
          title: 'Поттер',
          file: '',
          wishUrl:
            'https://market.yandex.ru/search?text=%D0%B3%D0%B0%D1%80%D1%80%D0%B8%20%D0%BF%D0%BE%D1%82%D1%82%D0%B5%D1%80&hid=987260&hid=10683227&rs=eJwzcghgrGLh-LPA5hOjFAeDwMJDrBIMCkCuwu22HlYNIEMDxPjL2Hy40q6XSWj_J7upTLYc2-0WMbFZWpgbmRk4RXFpcbFxMErwKrAIsEvx5CamlMUXZ6TmpMUbKcy8yqkx9_RnRiN2DhAlwARVy6jACFTLnVyQGJ-Zl1xaEm-owKDBYMTLMaGhoeHDlvY5qxkFgNCLI83YwsTQ2DQxyMjQ3NjC2MDSyMLA3NhEPynVzCTN2DItySQpzSA52STR0DDZ2CAxKS3JKNnAzMBA31DfEADUGj8c&rt=9',
          wishListId: 7,
          price: '500',
          isArchived: false,
        },
        {
          title: 'Поттер',
          file: '',
          wishUrl:
            'https://market.yandex.ru/search?text=%D0%B3%D0%B0%D1%80%D1%80%D0%B8%20%D0%BF%D0%BE%D1%82%D1%82%D0%B5%D1%80&hid=987260&hid=10683227&rs=eJwzcghgrGLh-LPA5hOjFAeDwMJDrBIMCkCuwu22HlYNIEMDxPjL2Hy40q6XSWj_J7upTLYc2-0WMbFZWpgbmRk4RXFpcbFxMErwKrAIsEvx5CamlMUXZ6TmpMUbKcy8yqkx9_RnRiN2DhAlwARVy6jACFTLnVyQGJ-Zl1xaEm-owKDBYMTLMaGhoeHDlvY5qxkFgNCLI83YwsTQ2DQxyMjQ3NjC2MDSyMLA3NhEPynVzCTN2DItySQpzSA52STR0DDZ2CAxKS3JKNnAzMBA31DfEADUGj8c&rt=9',
          wishListId: 7,
          price: '500',
          isArchived: false,
        },
        {
          title: 'Поттер',
          file: '',
          wishUrl:
            'https://market.yandex.ru/search?text=%D0%B3%D0%B0%D1%80%D1%80%D0%B8%20%D0%BF%D0%BE%D1%82%D1%82%D0%B5%D1%80&hid=987260&hid=10683227&rs=eJwzcghgrGLh-LPA5hOjFAeDwMJDrBIMCkCuwu22HlYNIEMDxPjL2Hy40q6XSWj_J7upTLYc2-0WMbFZWpgbmRk4RXFpcbFxMErwKrAIsEvx5CamlMUXZ6TmpMUbKcy8yqkx9_RnRiN2DhAlwARVy6jACFTLnVyQGJ-Zl1xaEm-owKDBYMTLMaGhoeHDlvY5qxkFgNCLI83YwsTQ2DQxyMjQ3NjC2MDSyMLA3NhEPynVzCTN2DItySQpzSA52STR0DDZ2CAxKS3JKNnAzMBA31DfEADUGj8c&rt=9',
          wishListId: 8,
          price: '500',
          isArchived: false,
        },
        {
          title: 'Поттер',
          file: '',
          wishUrl:
            'https://market.yandex.ru/search?text=%D0%B3%D0%B0%D1%80%D1%80%D0%B8%20%D0%BF%D0%BE%D1%82%D1%82%D0%B5%D1%80&hid=987260&hid=10683227&rs=eJwzcghgrGLh-LPA5hOjFAeDwMJDrBIMCkCuwu22HlYNIEMDxPjL2Hy40q6XSWj_J7upTLYc2-0WMbFZWpgbmRk4RXFpcbFxMErwKrAIsEvx5CamlMUXZ6TmpMUbKcy8yqkx9_RnRiN2DhAlwARVy6jACFTLnVyQGJ-Zl1xaEm-owKDBYMTLMaGhoeHDlvY5qxkFgNCLI83YwsTQ2DQxyMjQ3NjC2MDSyMLA3NhEPynVzCTN2DItySQpzSA52STR0DDZ2CAxKS3JKNnAzMBA31DfEADUGj8c&rt=9',
          wishListId: 8,
          price: '500',
          isArchived: false,
        },
      ],
      {},
    );
    // await queryInterface.bulkInsert(
    //   'Presents',
    //   [
    //     {
    //       userId: 1,
    //       wishId: 1,
    //     },
    //     {
    //       userId: 1,
    //       wishId: 2,
    //     },
    //     {
    //       userId: 1,
    //       wishId: 3,
    //     },
    //     {
    //       userId: 1,
    //       wishId: 4,
    //     },
    //     {
    //       userId: 2,
    //       wishId: 5,
    //     },
    //     {
    //       userId: 2,
    //       wishId: 6,
    //     },
    //     {
    //       userId: 1,
    //       wishId: 7,
    //     },
    //     {
    //       userId: 1,
    //       wishId: 9,
    //     },

    //   ],
    //   {},
    // );
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
