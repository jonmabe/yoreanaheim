'use strict';

var models  = require('../../../models');
var sequelize = require('sequelize');

module.exports = function *() {
	var publications = yield models.publication.findAll({
		attributes: [
			'id',
			'name',
	    	[ models.sequelize.fn('count', models.sequelize.col('editions.id') ), 'count' ]
		],
		include: [{ attributes: [], model: models.edition }],
		group: ['publication.id', 'publication.name'],
		order: ['name']
	});

	this.body = publications;
}
