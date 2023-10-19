"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _subareacontroller = require('../controller/subarea.controller'); var _subareacontroller2 = _interopRequireDefault(_subareacontroller);
var _express = require('express');


class SubAreaRouter {
  
  constructor() {
    this.router = _express.Router.call(void 0, );
    // this.router.use(routerMiddleware.authenticated);
    this.routers();
  }

   routers() {
    this.router.get("/search/", _subareacontroller2.default.search);
    this.router.get("/", _subareacontroller2.default.all);
    this.router.post("/", _subareacontroller2.default.create);
    this.router.get("/:id", _subareacontroller2.default.find);
    this.router.post("/:id/edit", _subareacontroller2.default.update);
    this.router.post("/:id/delete", _subareacontroller2.default.delete);
  }
}

exports. default = new SubAreaRouter().router;
