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
import webpack from 'webpack';
import webpackDevServer from 'webpack-dev-server';
import webpackConfig from '../../webpack.config.js';

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

if(process.env.NODE_ENV === 'production'){
        app.use(serve(path.join(__dirname, '../../app/build'), {
        }));

        app.use(function *(){
                // not sure if this is the right way to do it, but it redirects all other output to index.html
                this.body =  fs.readFileSync(path.join(__dirname, '../../app/build/index.html'), 'utf8');
        });
} else {
        new webpackDevServer(webpack(webpackConfig), {
                hot: true,
                historyApiFallback: true,
                proxy: {
                        "*": "http://localhost:3000"
                }
        }).listen(3001, 'localhost', function (err, result) {
                if (err) {
                        console.log(err);
                }

                console.log('Listening at localhost:3001');
        });
}

// start server
app.listen(port, function() {
	console.log('listening on port ' + port);
});