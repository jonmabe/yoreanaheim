'use strict';

var models  = require('../../../models');

var monthNames = {
	'january': 0,
	'february': 1,
	'march': 2,
	'april': 3,
	'may': 4,
	'june': 5,
	'july': 6,
	'august': 7,
	'september': 8,
	'october': 9,
	'november': 10,
	'december': 11
}

module.exports = function *() {
	var pageLength = 25;
	var publication = yield models.publication.findByPk(this.params.id);
	var offset = null;
	var limit = null;
	var where = {};
	var months = null;

	if (typeof this.params.page != "undefined") {
		offset = pageLength * this.params.page;
		limit = pageLength;
		where = { 'publication_id': this.params.id };
	} else if(typeof this.params.month != "undefined"){
		var from = new Date(Date.UTC(this.params.year, monthNames[this.params.month], 1, 0, 0, 0));
		var to = new Date(new Date(from).setMonth(from.getMonth()+1)-1);

		where = {
			'publication_id': this.params.id,
	 	 	'edition_date': { $between: [ from, to ] }
		};
	} else if (typeof this.params.year != "undefined"){
		var from = new Date(Date.UTC(this.params.year, 0, 1, 0, 0, 0));
		var to = new Date(Date.UTC(this.params.year, 11, 31, 11, 59, 59));
		where = {
			'publication_id': this.params.id,
	 	 	'edition_date': { $between: [ from, to ] }
		};

		months = yield models.edition.findAll({
			where: where,
	  	attributes: [
		    [ models.sequelize.fn('date_trunc', 'month',  models.sequelize.col('edition_date')), 'dateTrunc' ],
		    [ models.sequelize.fn('count', models.sequelize.col('id') ), 'count' ]
		  ],
		  group: '"dateTrunc"',
		  order: '"dateTrunc"'
		});
	}

	var editions = yield models.edition.findAndCountAll({
		where: where,
		order: [
			['edition_date', 'ASC']
		],
		limit: limit,
		offset: offset
	});

	publication.editions = editions;

	this.body = {
		publication: publication,
		editions: editions,
		months: months
	};
}
