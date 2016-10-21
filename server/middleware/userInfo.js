/**
 * Created by uzysjung on 2016. 9. 2..
 */
'use strict';
const DEBUG = require('debug')('middlewareUserInfo');
const Co                = require('co');
const modelUser     = require('../models/user');
const _                 = require('lodash');


const internals = {};

// assign authUserInfo
internals.authUserInfo = function (request,reply) {

    const userID = request.auth.credentials.id;
    Co(function*(){

        if (_.isNil(userID)) {
            reply( { error: 'userID is Nil' } );
        }
        const data  = yield modelUser.fetch({ id: userID });
        if (data && data.length === 0) {
            reply( { error : 'No User Data' } );
        }
        reply( { role:data[0].role } );

    }).catch( (e) => {

        reply({ error : e.message });

    });
};


module.exports = internals;
