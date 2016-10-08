'use strict';

import koaRouter from 'koa-router';
import routes from './routes';

var router = koaRouter();

// sample - basic routing
router.get('/api/publications', routes.publication.list);
router.get('/api/publication/:id/page/:page', routes.publication.get);

module.exports = router;
