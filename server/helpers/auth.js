/**
 * Created by uzysjung on 2016. 10. 22..
 */
const _ = require('lodash');
const internals = {};


//put in Route prerequisites
internals.getUserRole = function (request) {
    const role = _.get(request.pre.authInfo, 'role');
    console.log('User Role',role);

    return role;
};





module.exports = internals;