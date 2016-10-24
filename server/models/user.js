/**
 * Created by uzysjung on 2016. 10. 18..
 */

'use strict';

const UzysDB    = require('../helpers/UzysDB');
const Bcrypt    = require('bcryptjs');
const Jwt       = require('jsonwebtoken');
const Co        = require('co');
const _         = require('lodash');
const Joi       = require('joi');
const Config  = require('../../config');

class DashUser extends UzysDB {
    constructor(tableName) {

        super(tableName);
    }

    create(params) {

        const self = this;
        return Co(function*(){

            if ( !_.hasIn(params,'login_pw') || params.login_pw.length < 8 ) {
                throw new Error('패스워드는 8자 이상이어야 합니다');
            }

            const willSaveParams = _.cloneDeep(params);

            willSaveParams.login_pw = Bcrypt.hashSync(params.login_pw, 10);
            // console.log('params',willSaveParams);

            return yield self.save(willSaveParams);

        });
    }
    updateByID(id,params) {

        const willSaveParams = _.cloneDeep(params);

        if (willSaveParams.hasOwnProperty('login_email')) {
            if (!Joi.validate( { login_email } , { login_email : Joi.string().email() }) ) {
                throw new Error('email is not valid');
            }
        }
        else if (params.hasOwnProperty('login_pw')) {

            if (params.login_pw.length < 8) {
                throw  new Error('password length is smaller than 8');
            }
            willSaveParams.login_pw = Bcrypt.hashSync(params.login_pw, 10);
        }
        console.log(willSaveParams);
        return super.update({ id },willSaveParams);
    }

    update(id,params) {

        const willSaveParams = _.cloneDeep(params);

        if (willSaveParams.hasOwnProperty('login_email')) {
            if (!Joi.validate( { login_email } , { login_email : Joi.string().email() }) ) {
                throw new Error('email is not valid');
            }
        }
        else if (params.hasOwnProperty('login_pw')) {

            if (params.login_pw.length < 8) {
                throw  new Error('password length is smaller than 8');
            }
            willSaveParams.login_pw = Bcrypt.hashSync(params.login_pw, 10);
        }
        _.unset(willSaveParams, 'role');
        console.log(willSaveParams);
        return super.update({ id },willSaveParams);
    }

    login(email,password) {

        const self = this;
        return Co(function*(){
            const data = yield self.fetch({ login_email:email });
            if (data === null || data.length === 0) {
                throw new Error('bad userEmail');
            }
            const isValid = Bcrypt.compareSync(password,data[0].login_pw);

            if (isValid === false) {
                throw new Error('wrong password');
            }
            return self.token(data[0].id, data[0].role);

        });
    }
    token(userId , role) {
        return { token: Jwt.sign({ id: userId }, Config.SECRET_KEY, { expiresIn: '48h' }) ,userID : userId , role};
    }

    validate(decoded, request, callback) {

        const promise = this.fetch({ id: decoded.id });
        promise.then( (data) => {
            if (data === null){
                return callback(null, false);
            }
            return callback(null, true);

        });
        promise.catch( (e) => {
            return callback(e, false);
        });
    }

}
module.exports = new DashUser('USER');
