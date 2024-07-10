"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _arquivocontroller = require('../controller/arquivo.controller'); var _arquivocontroller2 = _interopRequireDefault(_arquivocontroller);
var _express = require('express');


class ArquivoRouter {
  
  constructor() {
    this.router = _express.Router.call(void 0, );
    // this.router.use(routerMiddleware.authenticated);
    this.routers();
  }

   routers() {
    this.router.get("/search/", _arquivocontroller2.default.search);
    this.router.get("/", _arquivocontroller2.default.all);
    this.router.post("/", _arquivocontroller2.default.create);
    this.router.post("/mp4", _arquivocontroller2.default.createMp4);
    this.router.get("/:id", _arquivocontroller2.default.find);
    this.router.post("/:id/edit", _arquivocontroller2.default.update);
    this.router.post("/:id/delete", _arquivocontroller2.default.delete);
  }
}

exports. default = new ArquivoRouter().router;
