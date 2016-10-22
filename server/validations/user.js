/**
 * Created by uzysjung on 2016. 10. 18..
 */
'use strict';
const Joi = require('joi');
module.exports = {
    login : {
        payload: {
            login_email     : Joi.string().email().min(5).required().description('사용자 ID'),
            login_pw        : Joi.string().min(6).required().description('사용자 암호')
        }
    },
    register : {
        payload : {
            login_email     : Joi.string().email().min(5).required().description('사용자 ID'),
            login_pw        : Joi.string().min(8).required().description('사용자 암호'),
            login_pwVerify  : Joi.string().min(8).required().description('사용자 암호 검사용'),
            contact         : Joi.string().description('contact info')
        }
    },
    update : {
        payload : {
            login_pw        : Joi.string(),
            status          : Joi.string().valid('ACTIVE','SUSPENDED').description('상태(ACTIVE,SUSPENDED'),
            contact         : Joi.object().keys({
                name : Joi.string(),
                email : Joi.string().email(),
                phone : Joi.string()
            }).description('Contact Info')
        }
    }
};
