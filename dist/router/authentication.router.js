"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _authenticationcontroller = require('../controller/authentication.controller'); var _authenticationcontroller2 = _interopRequireDefault(_authenticationcontroller);
var _express = require('express');

var _routermiddleware = require('../middleware/router.middleware'); var _routermiddleware2 = _interopRequireDefault(_routermiddleware);

class AuthenticationRouter {
  

  constructor () {
    this.router = _express.Router.call(void 0, )
    this.routers()
  }

   routers () {
    this.router.post('/', _authenticationcontroller2.default.login)
    this.router.get('/logged', _routermiddleware2.default.authenticated, _authenticationcontroller2.default.logged)
  }
}

exports. default = new AuthenticationRouter().router
