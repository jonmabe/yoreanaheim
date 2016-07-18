'use strict';

var models  = require('../../../models');

module.exports = function *() {	
	var editions = yield models.edition.findAll();
	
	this.body = editions;
}
