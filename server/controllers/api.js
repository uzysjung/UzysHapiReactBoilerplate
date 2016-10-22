/**
 * Created by uzysjung on 15. 7. 9..
 */
'use strict';
const DEBUG     = require('debug')('api');
const ModelAPI  = require('../models/api');
const Axios     = require('axios');
const Co    = require('co');
const Boom          = require('boom');
const helperAuth                = require('../helpers/auth');

 module.exports = exports = {

     authInfo: function (request,reply) {

         reply( request.pre.authInfo );
    },

    github : function (request, reply) {
        const userID = request.params.userID;
        const userRole = helperAuth.getUserRole(request);

        Co( function* () {
            const resp = yield Axios.get(`http://api.github.com/users/${userID}/repos`);

            let data = {};
            if(resp.data) {
                data = resp.data;
            }

            reply(data);

        }).catch(function(err){
            request.log('failed fetching github :',err.stack);
            reply(Boom.badData(err.message));

        });

    }

};

//class ControllerAPI {
//
//    list(request,reply) {
//
//        const id = request.params.id;
//        const page = request.query.page;
//        request.log('api params.id :',id);
//
//        reply( { name : ['api1','api2','api3'], id, page } );
//    }
//    root(request,reply) {
//
//        reply.view('index', { title: 'UzysHapiSkeleton' });
//    }
//    auth(request,reply) {
//
//        reply.view('authentication', { title: 'UzysHapiSkeleton Basic authentication' });
//    }
//}
//
//exports = module.exports = new ControllerAPI();