'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
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
  },

  down: function (queryInterface, Sequelize) {
    return [
      queryInterface.removeColumn('publications', 'about_excerpt'),
      queryInterface.removeColumn('publications', 'about')
    ];
  }
};
