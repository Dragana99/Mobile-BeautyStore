//secure api u serveru, autentifikacija usera preko jwt
const expressJwt = require('express-jwt');

function authJwt() {
    const secret = process.env.secret;
    const api = process.env.API_URL;

    return expressJwt({
        secret,
        algorithms: ['HS256'],//tip tokena,
        isRevoked: isRevoked
    }).unless({
        path: [
            {url: /\/public\/uploads(.*)/ , methods: ['GET', 'OPTIONS'] },
            {url: /\/api\/v1\/products(.*)/ , methods: ['GET', 'OPTIONS'] }, // cak i za api/v1/products/count, itd.. regex expressions
            {url: /\/api\/v1\/categories(.*)/ , methods: ['GET', 'OPTIONS'] },
            {url: /\/api\/v1\/orders(.*)/,methods: ['GET', 'OPTIONS', 'POST']},
            `${api}/users/login`,
            `${api}/users/register`,
        ]
    })
}

async function isRevoked(req, payload, done) {
    if(!payload.isAdmin) {
        done(null, true)
    }

    done();
}

module.exports = authJwt;