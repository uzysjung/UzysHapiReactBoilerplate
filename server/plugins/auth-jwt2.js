/**
 * Created by uzysjung on 2016. 7. 15..
 */
'use strict';
const Config  = require('../../config');
const HapiAuthJWT = require('hapi-auth-jwt2');
const modelUser = require('../models/user');

module.exports = function (server) {

    return new Promise( (resolve,reject) => {

        server.register(HapiAuthJWT, (err) => {
            if (err){
                console.log(err);
                return reject(err);
            }
            // see: http://hapijs.com/api#serverauthschemename-scheme
            server.auth.strategy('jwt', 'jwt',
                {
                    key: Config.SECRET_KEY,
                    validateFunc: modelUser.validate.bind(modelUser),
                    verifyOptions: { algorithms: [ 'HS256' ] }
                });

            server.auth.default('jwt');
            resolve();
        });


    });
};
