/**
 * Created by uzysjung on 2016. 10. 18..
 */
'use strict';
const userController = require('../controllers/user');
const validation = require('../validations/user');
const middleware = require('../middleware/userInfo');

module.exports = function() {
    return [
        {
            method: 'POST',
            path: '/api/register',
            config : {
                auth: false,
                description: 'USER Register',
                notes: 'USER Register',
                tags : ['api'],
                handler :  userController.register,
                validate : validation.register
            }
        },
        {
            method: 'POST',
            path: '/api/login',
            config : {
                auth: false,
                description: 'USER LOGIN',
                notes: 'API LOGIN  ',
                tags :['api'],
                handler: userController.login,
                validate : validation.login
            }
        },
        {
            method : 'PUT',
            path: '/api/user',
            config : {
                description: 'My USER Info Update',
                notes: 'User Info Update  ',
                tags :['api'],
                handler: userController.update,
                validate : validation.update
            }
        },
        {
            method: 'GET',
            path: '/api/user',
            config : {
                description: 'User fetch detail',
                notes: 'API User fetch detail',
                tags :['api'],
                handler: userController.fetch
            }
        },

    ];
}();