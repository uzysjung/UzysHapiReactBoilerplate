/**
 * Created by uzysjung on 15. 7. 9..
 */
'use strict';
const ApiController = require('../controllers/api');
const ApiValidate = require('../validations/api');
const middleware = require('../middleware/userInfo');

module.exports = function () {

    return [
        {
            method: 'GET',
            path: '/api/github/user/{userID}',
            config : {
                description: 'ABTestConfig channels',
                notes: 'API Fetch Channels by service_id',
                tags :['api'],
                auth : false,
                handler: ApiController.github,
                validate : ApiValidate.github
            }
        },
         {
             method: 'GET',
             path: '/api/authInfo',
             config : {
                 description: 'api Authorization Information',
                 notes: 'Role , Email ',
                 tags :['api'], //you must put in 'api' in order to use Swagger-UI.
                 pre : [{ method:middleware.authUserInfo , assign: 'authInfo' }],
                 handler: ApiController.authInfo,
                 validate: ApiValidate.authInfo
             }
         },
    ];
}();