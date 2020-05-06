const expressJwt = require('express-jwt')
const config = require('../config.json')
const userService = require('../users/user.service')
const batteryService = require('../batteries/batteries.service')
const electricService = require('../electrics/electric.service')

module.exports = jwt;

function jwt() {
    const secret = config.secret;
    return expressJwt({ secret, isRevoked }).unless({
        path: [
            // public routes that don't require authentication
            '/users/authenticate',
            '/users/register'
        ]
    });
}

async function isRevoked(req, payload, done) {
    const user = await userService.getById(payload.sub)
    const battery = await batteryService.getById(payload.sub)
    const electric = await electricService.getById(payload.sub)
    // revoke token if user no longer exists
    if (!user) {
        return done(null, true);
    }

    if (!electric) {
        return done(null, true);
    }

    if (!battery) {
        return done(null, true);
    }

    done();
};