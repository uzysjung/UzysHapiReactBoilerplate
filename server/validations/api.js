/**
 * Created by uzysjung on 15. 7. 9..
 */

'use strict';
const Joi = require('joi');

module.exports = {

    authInfo : {
        query: {
            token: Joi.string().description('token')
        }
    },
    github : {
        params: {
            userID : Joi.string().description('github id')
        },
        query: {
            token: Joi.string().description('token')
        }
    }
};