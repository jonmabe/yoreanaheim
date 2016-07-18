'use strict';

import path from 'path';
import koa from 'koa';
import logger from 'koa-logger';
import config from 'config';
import router from './router';
import sawyer from 'sawyer';
import serve from 'koa-static';
import pkg from '../../package.json';
import fs from 'fs'

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

app.use(serve(path.join(__dirname, '../../app/build'), {
}));

app.use(function *(){
        // not sure if this is the right way to do it, but it redirects all other output to index.html
        this.body =  fs.readFileSync(path.join(__dirname, '../../app/build/index.html'), 'utf8');
});

// start server
app.listen(config.server.port, function() {
	console.log('listening on port ' + config.server.port);
});

