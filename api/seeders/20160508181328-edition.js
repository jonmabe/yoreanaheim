'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
      return queryInterface.bulkInsert('editions', [{
        publication_id: 1,        
        name: 'January 1st, 1919',
        pages: 3,
        pdf: 'http://www.google.com',
        edition_number: '#34',
        notes: null,
        text_content: null
      },{
        publication_id: 1,        
        name: 'January 8th, 1919',
        pages: 3,
        pdf: 'http://www.google.com',
        edition_number: '#35',
        notes: null,
        text_content: null
      }], {});
  },

  down: function (queryInterface, Sequelize) {
      return queryInterface.bulkDelete('editions', null, {});
  }
};
