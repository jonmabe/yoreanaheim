'use strict';

var models  = require('../../../models');
var sequelize = require('sequelize');

module.exports = function *() {
	var years = {};
	var publication = yield models.publication.findById(this.params.id);

	years = yield models.edition.findAll({
		where: {'publication_id': publication.id},
  	attributes: [
	    [ models.sequelize.fn('date_trunc', 'year',  models.sequelize.col('edition_date')), 'dateTrunc' ],
	    [ models.sequelize.fn('count', models.sequelize.col('id') ), 'count' ]
	  ],
	  group: '"dateTrunc"',
	  order: '"dateTrunc"'
	});

	this.body = {
		publication: publication,
		years: years
	};
}
