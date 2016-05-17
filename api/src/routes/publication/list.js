'use strict';

var models  = require('../../../models');

module.exports = function *() {	
	var publications = yield models.publication.findAll();
	
	this.body = publications;
}
