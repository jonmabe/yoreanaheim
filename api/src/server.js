'use strict';

import path from 'path';
import koa from 'koa';
import logger from 'koa-logger';
import config from 'config';
import router from './router';
import sawyer from 'sawyer';
import serve from 'koa-static';
import pkg from '../../package.json';

// init app
var app = koa();

// app config
process.title = pkg.name;
process.versions.app = pkg.version;
app.poweredBy = false;

app.use(serve(path.join(__dirname, '../../app/build'), {
        // This ensures that the default index.html file is not loaded statically
        //index: 'ignore.html'
}));

// add middleware
app.use(logger());
app.use(router.routes());
app.use(router.allowedMethods());

// start server
app.listen(config.server.port, function() {
	console.log('listening on port ' + config.server.port);
});

