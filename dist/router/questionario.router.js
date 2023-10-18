"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _questionariocontroller = require('../controller/questionario.controller'); var _questionariocontroller2 = _interopRequireDefault(_questionariocontroller);
var _express = require('express');



class QuestionarioRouter {
  

  constructor () {
    this.router = _express.Router.call(void 0, )
    // this.router.use(routerMiddleware.authenticated)
    this.routers()
  }

   routers () {
    this.router.get('/search/', _questionariocontroller2.default.search)
    this.router.get('/', _questionariocontroller2.default.all)
    this.router.post('/', _questionariocontroller2.default.create)
    this.router.get('/:id', _questionariocontroller2.default.find)
    this.router.post('/:id/edit', _questionariocontroller2.default.update)
    this.router.post('/:id/delete', _questionariocontroller2.default.delete)
  }
}

exports. default = new QuestionarioRouter().router
