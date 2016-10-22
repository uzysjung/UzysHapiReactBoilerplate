/**
 * Created by Uzysjung on 15. 7. 9..
 */
'use strict';

class Config {

    constructor() {

    }
    get NODE_ENV() {
        return process.env.NODE_ENV;
    }
    get HOSTNAME() {
        if ( process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test' ) {
            return 'localhost';
        }

        return 'localhost'
    }
    get MYSQL() {

        let ret = {
            host     : 'production.io',
            user     : 'root',
            password : 'root',
            database : 'UzysHapiReactBoilerplate'
        };
        if (this.NODE_ENV === 'development') {
            ret = {
                host: 'localhost',
                user: 'root',
                password: 'root',
                database: 'UzysHapiReactBoilerplate'
            };
        }
        return ret;
    }
    get MYSQL_POOL() {

        if ( process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test' ) {
            return { min: 0, max: 20 };
        }

        return { min: 0, max: 20 };
    }
    get PORT() {

        if (this.NODE_ENV === 'development') {
            return 8000;
        }
        return process.env.PORT;
    }

    get MYSQL_TIMEOUT() {
        return 1500;
    }

    get SECRET_KEY() {
        return '79E965E66BFAD971FAFD637325EAA';
    }

    get WEB_ROOT() {
        return 'public';
    }

}

module.exports = new Config();
