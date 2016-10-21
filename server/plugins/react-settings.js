/**
 * Created by uzysjung on 15. 11. 28..
 */
'use strict';
const Config  = require('../../config');
const Path    = require('path');
const webRoot = Path.resolve(__dirname, '../../', Config.WEB_ROOT);


module.exports = function(server) {

    return new Promise(function(resolve,reject) {

        try {

            server.ext('onRequest', function (request, next) {
                console.info('Inbound started: ', {'Correlation-Id': request.id, 'URL': request.url.href});
                return next.continue();
            });

            server.ext('onPreResponse', function (request, reply) {

                if (request.response.isBoom && request.response.output && (request.response.output.statusCode===404)) {
                    let parts = request.url.path.split('/');
                    // console.log('parts:',parts);
                    const isIndexRoute = (parts[1] !== 'API') && (getExtension(parts[parts.length - 1]) === '');
                    // console.log('isIndexRoutes',isIndexRoute);
                    if (isIndexRoute) {
                        console.info('Inbound completed: ', {statusCode: 200, 'Correlation-Id': request.id, 'URL': request.url.href, 'Response': request.response.output});

                        if(process.env.NODE_ENV === 'development') {
                            console.log('webRoot:',webRoot);
                            const page = server.plugins.UzysWebpackMiddleware.devMiddleware.fileSystem.readFileSync(`${webRoot}/index.html`);

                            return reply(page).header('Correlation-Id', request.id).header('Content-Type', 'text/html');
                        }
                        return reply.view('index', request).header('Correlation-Id', request.id);
                    }
                }
                console.info('Inbound completed: ', {statusCode: request.response.statusCode, 'Correlation-Id': request.id, 'URL': request.url.href, 'Response': request.response.payload});

                if(request.response.header && request.id){
                    request.response.header('Correlation-Id', request.id);
                }
                return reply.continue();
            });

            server.views({
                engines: {
                    html: {
                        compile: (template, compileOptions)=>{
                            return (context, renderOptions)=>{
                                return template;
                            }
                        }
                    }
                },
                relativeTo: webRoot,
                path: './'
            });

        }
        catch (e) {
            reject(e);
        }
        server.log(['info', 'plugin'], 'plugin: react-settings registered');
        resolve();
    });


};

function getExtension(filename) {
    let ext = Path.extname(filename||'').split('.');
    return ext[ext.length - 1];
}
