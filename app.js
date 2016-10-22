/*
 * Created by uzysjung on 16. 10. 9..
 */

'use strict';
const Hapi = require('hapi');
const Config = require('./config');
const server = new Hapi.Server();
const Co = require('co');

server.connection({ port: Config.PORT, routes: { cors: true , jsonp: 'callback' } });

Co(function*() {

    yield require('./server/plugins/hapi-pino')(server);
    yield [require('./server/plugins/inert')(server), require('./server/plugins/vision')(server)];
    yield require('./server/plugins/scooter')(server);
    yield require('./server/plugins/hapi-auth-basic')(server);
    yield require('./server/plugins/hapi-swagger')(server);
    yield require('./server/plugins/auth-jwt2')(server);

    if (process.env.API_ONLY === 'true' && Config.NODE_ENV === 'development') {
        console.log('[WARN] API_ONLY SERVER');
    } else {
        if (Config.NODE_ENV === 'development') {
            yield require('./server/plugins/hapi-webpack')(server);
        }
        yield require('./server/plugins/react-settings')(server);
    }

    server.route( { method: 'GET', path: '/{path*}', config: {auth: false,  handler: { directory: { path: './public' ,redirectToSlash: true } } } });
     server.route(require('./server/routes/api'));
    server.route(require('./server/routes/user'));


    server.start((err) => {

        if (err) {
            server.log(['error', 'server'],'Server Error Occured' + err);
            process.exit();
        }
        server.log(['info', 'server'], 'Server environment: ' + Config.NODE_ENV);
        server.log(['info', 'server'], 'Server running at: ' + server.info.uri);
    });


}).catch( (e) => {

    server.log('app.js error:',e);
    server.log('stack - ',e.stack);
});

process.on('SIGINT', () => {

    // My process has received a SIGINT signal
    // Meaning PM2 is now trying to stop the process
    server.stop({ timeout:1000 }, (err) => {

        if (err) {
            console.error(err);
        }
        server.log('Colloseo Hapi server stopped');
        process.exit();
    });
});


module.exports = exports = server;

