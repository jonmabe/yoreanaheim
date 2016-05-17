'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
      return queryInterface.bulkInsert('publications', [{
        id: 1,
        name: 'Anaheim Gazette'
      }], {});
  },

  down: function (queryInterface, Sequelize) {
      return queryInterface.bulkDelete('publications', null, {});
  }
};
