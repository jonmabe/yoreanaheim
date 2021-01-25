'use strict';

var models  = require('../../../models');
var sequelize = require('sequelize');

module.exports = function *() {
	var result = {};

	result = yield models.edition.findOne({
  	attributes: [
	    [ models.sequelize.fn('sum', models.sequelize.col('pages') ), 'sumPages' ]
	  ]
	});

	this.body = result;
}
