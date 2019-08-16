const express = require('express');
const UserController = require('./Controllers/UserController');
const CompanyController = require('./Controllers/CompanyController');
const UserCompanyController = require('./Controllers/UserCompanyController');

const routes = express.Router();

routes.post('/user', UserController.store);
routes.put('/user', UserController.put);
routes.delete('/user', UserController.remove);
routes.post('/company', CompanyController.store);
routes.post('/usercompany', UserCompanyController.store);

module.exports = routes;