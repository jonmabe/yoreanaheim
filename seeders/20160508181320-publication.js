'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
      return queryInterface.bulkInsert('publications', [{
        id: 1,
        name: 'Anaheim Gazette'
      },{
        id: 2,
        name: 'Anaheim Bulletin'
      }], {});
  },

  down: function (queryInterface, Sequelize) {
      return queryInterface.bulkDelete('publications', null, {});
  }
};
