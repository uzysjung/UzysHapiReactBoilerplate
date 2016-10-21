/**
 * Created by uzysjung on 2016. 10. 18..
 */
'use strict';
const DEBUG         = require('debug')('user');
const Co            = require('co');
const modelUser     = require('../models/user');
const Config        = require('../../config');
const Jwt           = require('jsonwebtoken');
const Boom          = require('boom');
const _             = require('lodash');

module.exports = {

    register: function (request , reply) {

        const email = request.payload.login_email;
        const pass = request.payload.login_pw;
        const passVerify = request.payload.login_pwVerify;

        if(pass !== passVerify) {
            return reply(Boom.badData('password verification failed'));
        }

        Co( function*(){

            let data ;
            try {
                data = yield modelUser.create( {login_email:email , login_pw:pass } );
            }
            catch ( e ) {
                if( e.toString().includes('ER_DUP_ENTRY')) {
                    return reply(Boom.badData('Email Already Taken'));
                } else {
                    console.log('e',e);
                    return reply(Boom.badRequest());
                }
            }
            data = yield modelUser.fetch({id : data[0]});
            reply({ login_email:data[0].login_email , token: Jwt.sign({ id: data[0].id }, Config.SECRET_KEY, {expiresIn: '12h'}) } ).code(201);

        }).catch(function(err){
            console.log('register err:',err.stack);
            reply(Boom.badImplementation(err.message));
        });


    },

    login : function (request,reply) {

        const email = request.payload.login_email;
        const pass = request.payload.login_pw;

        Co( function*(){

            const loginPromise = modelUser.login(email,pass);
            const data = yield loginPromise;
            reply(data);

        }).catch(function(err){
            request.log('login err:',err.stack);
            reply(Boom.badData(err.message));

        });

    },
    fetch: function (request,reply) {

        const user_id = request.auth.credentials.id;

        Co(function*(){

            const ret = yield modelUser.fetch({id:user_id});
            let data = {};
            if(ret && ret.length > 0) {
                data = _.cloneDeep(ret[0]);
            }
            _.unset(data, 'id');
            _.unset(data, 'login_pw');
            _.unset(data, 'role');
            reply({ statusCode : 200 , message : 'Service Fetch Success' , data });

        }).catch(function(err){
            reply(Boom.badImplementation('Service fetch failed'));
        });
    },
    update: function (request,reply) {
        // console.log('request.auth:',request.auth);
        const payload = _.cloneDeep(request.payload);
        const user_id = request.auth.credentials.id;
        Co ( function*(){

            const updateStatus = yield modelUser.update(user_id,payload);
            // console.log('updateStatus:',updateStatus);
            reply({ statusCode : 200 , message : 'update success' });

        }).catch(function(err){
            console.log(err.stack);
            reply(Boom.badImplementation('User Information Update Failed'));
        });
    }
};