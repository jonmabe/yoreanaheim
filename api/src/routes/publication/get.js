'use strict';

var models  = require('../../../models');

module.exports = function *() {
	var pageLength = 25;
	var publication = yield models.publication.findById(this.params.id);
	var editions = yield models.edition.findAndCountAll({
		where: {'publication_id': this.params.id},
		limit: pageLength,
		offset: pageLength * this.params.page
	});

	publication.editions = editions;
	
	this.body = {
		publication: publication,
		editions: editions
	};
}
