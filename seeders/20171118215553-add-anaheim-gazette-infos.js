'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    
    var fs = require('fs');
    var file = fs.readFileSync('assets/anaheim-gazette-about.htm', "utf8");
    return queryInterface.sequelize.query('UPDATE publications SET about_excerpt=:about_excerpt, about=:about WHERE id=:id',
    {
      replacements: {
        id: 1,
        about_excerpt: 'The Anaheim Gazette was first newspaper published in what is now Orange County, California, and played an important role in the development of the county. For decades, it served as an important source of information, advertising, editorials, and community connections. Today, its pages provide a unique glimpse of the people, places, institutions, and events which make up the early history of Orange County.<br /><br />by Phil Brigandi - <a href=\'http://socalhistoryland.mysite.com/\' target=\'_blank\'>http://socalhistoryland.mysite.com/</a>',
        about: file
      }, type: Sequelize.QueryTypes.UPDATE
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.sequelize.query('UPDATE publications SET about_excerpt=null, about=null WHERE id=:id',
    {
      replacements: {
        id: 1
      }, type: Sequelize.QueryTypes.UPDATE
    })
  }
};
