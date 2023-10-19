"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _emailcontroller = require('../controller/email.controller'); var _emailcontroller2 = _interopRequireDefault(_emailcontroller);
var _express = require('express');

var _routermiddleware = require('../middleware/router.middleware'); var _routermiddleware2 = _interopRequireDefault(_routermiddleware);

class EmaillRouter {
  

  constructor () {
    this.router = _express.Router.call(void 0, )
    this.router.use(_routermiddleware2.default.authenticated)
    this.routers()
  }

   routers () {
    this.router.get('/search/', _emailcontroller2.default.search)
    this.router.get('/', _emailcontroller2.default.all)
    this.router.post('/', _emailcontroller2.default.create)
    this.router.get('/:id', _emailcontroller2.default.find)
    this.router.post('/:id/edit', _emailcontroller2.default.update)
    this.router.post('/:id/delete', _emailcontroller2.default.delete)
  }
}

exports. default = new EmaillRouter().router
