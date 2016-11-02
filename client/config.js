/**
 * Created by Uzysjung on 15. 7. 9..
 */
'use strict';

class Config {

    constructor() {

    }
    get HOSTNAME() {
        if ( process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test' ) {
            return 'localhost';
        }

        return 'localhost'
    }
    get PORT() {

        if (process.env.NODE_ENV === 'development') {
            return 8000;
        }
        return process.env.PORT || 8080;
    }
}

module.exports = new Config();
