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
            login_pw        : Joi.string().min(6).required().description('사용자 암호'),
            login_pwVerify  : Joi.string().min(6).required().description('사용자 암호 검사용')
        }
    },
    update : {
        payload : {
            login_pw        : Joi.string(),
            group_id        : Joi.number().integer().description('대표 사용자 group_id - 사용자들을 묶을 때 사용'),
            status          : Joi.string().valid('ACTIVE','SUSPENDED').description('상태(ACTIVE,SUSPEND'),
            contact         : Joi.object().keys({
                name : Joi.string(),
                email : Joi.string().email(),
                phone : Joi.string()
            }).description('Contact Info')
        }
    }
};
