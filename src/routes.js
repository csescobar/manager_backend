const express = require('express');
const jwt = require('jsonwebtoken');

const UserController = require('./Controllers/UserController');
const CompanyController = require('./Controllers/CompanyController');
const UserCompanyController = require('./Controllers/UserCompanyController');
const AuthControllet = require('./Controllers/AuthController');

const routes = express.Router();

routes.post('/user', verifyJWT, UserController.store);
routes.put('/user', verifyJWT, UserController.put);
routes.delete('/user', verifyJWT, UserController.remove);
routes.post('/company', verifyJWT, CompanyController.store);
routes.post('/usercompany', verifyJWT, UserCompanyController.store);
routes.post('/authenticate', AuthControllet.auth);

function verifyJWT(req, res, next) {
    var token = req.headers['x-access-token'];
    if (!token)
        return res.status(400).send({
            auth: false,
            message: 'No token provided'
        })
    jwt.verify(token, process.env.SECRET, function (err, decoded) {
        if (err)
            return res.status(500).send({
                auth: false,
                message: 'Failed to authenticate'
            })
        req.userId = decoded.id;
        next();

    })
}

module.exports = routes;