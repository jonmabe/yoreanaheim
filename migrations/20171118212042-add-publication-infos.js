'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return Promise.all([ 
      queryInterface.addColumn(
        'publications',
        'about_excerpt',
        {
          type: Sequelize.TEXT,
          allowNull: true
        }
      ),
      queryInterface.addColumn(
        'publications',
        'about',
        {
          type: Sequelize.TEXT,
          allowNull: true
        }
      )
    ]);
  },

  down: function (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('publications', 'about_excerpt'),
      queryInterface.removeColumn('publications', 'about')
    ]);
  }
};
