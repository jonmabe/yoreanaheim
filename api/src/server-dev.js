'use strict';

import koa from 'koa';
import logger from 'koa-logger';
import config from 'config';
import router from './router';
import pkg from '../../package.json';
import webpack from 'webpack';
import webpackDevServer from 'webpack-dev-server';
import webpackConfig from '../../webpack.config.js';
import rewrite from 'koa-rewrite';

// init app
var app = koa();

// app config
process.title = pkg.name;
process.versions.app = pkg.version;
app.poweredBy = false;

var port = process.env.PORT || config.server.port;

// add middleware
app.use(logger());
app.use(router.routes());
app.use(router.allowedMethods());

new webpackDevServer(webpack(webpackConfig), {
        hot: true,
        historyApiFallback: true,
        proxy: {
                "/api/*": "http://localhost:3000"
        }
}).listen(3001, 'localhost', function (err, result) {
        if (err) {
                console.log(err);
        }

        console.log('Listening at localhost:3001');
});

// start server
app.listen(port, function() {
	console.log('listening on port ' + port);
});