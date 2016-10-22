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

    const userID = _.get(request.auth.credentials,'id');
    Co(function*(){

        if (_.isNil(userID)) {
            return reply( { error: 'userID is Nil' } );
        }
        const data  = yield modelUser.fetch({ id: userID });
        if (data && data.length === 0) {
            return reply( { error : 'No User Data' } );
        }
        return reply( { id:data[0].id , role:data[0].role ,email :data[0].login_email } );

    }).catch( (e) => {

        reply({ error : e.message });

    });
};


module.exports = internals;
