'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
      return queryInterface.bulkInsert('publications', [{
        id: 1,
        name: 'Anaheim Gazette'
      },{
        id: 2,
        name: 'Anaheim Bulletin'
      },{
        id: 3,
        name: 'OC Plain Dealer'
      },{
        id: 4,
        name: 'Anaheim Daily Herald'
      }], {});
  },

  down: function (queryInterface, Sequelize) {
      return queryInterface.bulkDelete('publications', null, {});
  }
};
