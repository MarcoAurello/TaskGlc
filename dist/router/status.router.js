"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _statuscontroller = require('../controller/status.controller'); var _statuscontroller2 = _interopRequireDefault(_statuscontroller);
var _express = require('express');

var _routermiddleware = require('../middleware/router.middleware'); var _routermiddleware2 = _interopRequireDefault(_routermiddleware);

class StatusRouter {
  

  constructor () {
    this.router = _express.Router.call(void 0, )
    this.router.use(_routermiddleware2.default.authenticated)
    this.routers()
  }

   routers () {
    this.router.get('/search/', _statuscontroller2.default.search)
    this.router.get('/', _statuscontroller2.default.all)
    this.router.post('/', _statuscontroller2.default.create)
    this.router.get('/:id', _statuscontroller2.default.find)
    this.router.post('/:id/edit', _statuscontroller2.default.update)
    this.router.post('/:id/delete', _statuscontroller2.default.delete)
  }
}

exports. default = new StatusRouter().router
