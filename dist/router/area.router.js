"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _areacontroller = require('../controller/area.controller'); var _areacontroller2 = _interopRequireDefault(_areacontroller);
var _express = require('express');



class EmailRouter {
  

  constructor () {
    this.router = _express.Router.call(void 0, )
    // this.router.use(routerMiddleware.authenticated)
    this.routers()
  }

   routers () {
    this.router.get('/search/', _areacontroller2.default.search)
    this.router.get('/', _areacontroller2.default.all)
    this.router.post('/', _areacontroller2.default.create)
    this.router.get('/:id', _areacontroller2.default.find)
    this.router.post('/:id/edit', _areacontroller2.default.update)
    this.router.post('/:id/delete', _areacontroller2.default.delete)
  }
}

exports. default = new EmailRouter().router
