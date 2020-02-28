const express = require('express');
const jwt = require('jsonwebtoken');

const UserController = require('./Controllers/UserController');
const CompanyController = require('./Controllers/CompanyController');
const UserCompanyController = require('./Controllers/UserCompanyController');
const AuthController = require('./Controllers/AuthController');

const routes = express.Router();

routes.post('/user', UserController.store);
routes.put('/user', verifyJWT, UserController.put);
routes.delete('/user', verifyJWT, UserController.remove);
routes.post('/company', verifyJWT, CompanyController.store);
routes.put('/company', verifyJWT, CompanyController.put);
routes.delete('/company', verifyJWT, CompanyController.remove);
routes.post('/usercompany', verifyJWT, UserCompanyController.store);
routes.delete('/usercompany', verifyJWT, UserCompanyController.remove);
routes.post('/logout', verifyJWT, AuthController.logout);
routes.post('/authenticate', AuthController.auth);

function verifyJWT(req, res, next) {
    var token = req.headers['x-access-token'];
    if (!token)
        return res.status(400).send({
            auth: false,
            message: 'No token provided',
            token: null
        })
    jwt.verify(token, process.env.SECRET || 'nodejs', function (err, decoded) {
        if (err)
            return res.status(500).send({
                auth: false,
                message: 'Failed to authenticate',
                token: null
            })
        console.log(decoded.id);
        console.log(req.headers.userid);

        if (req.headers.userid !== decoded.id)
            return res.status(500).send({
                auth: false,
                message: 'Failed to authenticate',
                token: null
            })
        next();

    })
}

module.exports = routes;