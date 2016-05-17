'use strict';

import koa from 'koa';
import logger from 'koa-logger';
import config from 'config';
import router from './router';
import sawyer from 'sawyer';
import pkg from '../../package.json';

// init app
var app = koa();

// app config
process.title = pkg.name;
process.versions.app = pkg.version;
app.poweredBy = false;

// add middleware
app.use(logger());
app.use(router.routes());
app.use(router.allowedMethods());

// start server
app.listen(config.server.port, function() {
	console.log('listening on port ' + config.server.port);
});
