'use strict';

import koaRouter from 'koa-router';
import routes from './routes';

var router = koaRouter();

// sample - basic routing
router.get('/api/publications', routes.publication.list);
router.get('/api/publication/sumPages', routes.publication.sumPages);
router.get('/api/publication/:id/page/:page', routes.publication.get);
router.get('/api/publication/:id/year/:year', routes.publication.get);
router.get('/api/publication/:id/year/:year/month/:month', routes.publication.get);
router.get('/api/publication/:id/years', routes.publication.years);

module.exports = router;
