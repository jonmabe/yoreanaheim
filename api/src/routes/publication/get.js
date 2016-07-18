'use strict';

var models  = require('../../../models');

module.exports = function *() {	
	var publication = yield models.publication.findById(this.params.id);
	var editions = yield models.edition.findAll({
		where: {'publication_id': this.params.id}
	});

	publication.editions = editions;
	
	this.body = {
		publication: publication,
		editions: editions
	};
}
