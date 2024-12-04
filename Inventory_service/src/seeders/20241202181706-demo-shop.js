'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Shops', [
      { name: 'Магазин 1', location: 'Москва', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Магазин 2', location: 'Санкт-Петербург', createdAt: new Date(), updatedAt: new Date() },
      // Добавьте другие магазины по необходимости
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Shops', null, {});
  }
};
