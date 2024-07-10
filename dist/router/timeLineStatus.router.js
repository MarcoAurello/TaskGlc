"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _timeLineStatuscontroller = require('../controller/timeLineStatus.controller'); var _timeLineStatuscontroller2 = _interopRequireDefault(_timeLineStatuscontroller);
var _express = require('express');


class TimeLineStatusRouter {
  
  constructor() {
    this.router = _express.Router.call(void 0, );
    // this.router.use(routerMiddleware.authenticated);
    this.routers();
  }

   routers() {
    this.router.get("/search/", _timeLineStatuscontroller2.default.search);
    this.router.get("/", _timeLineStatuscontroller2.default.all);
    this.router.post("/", _timeLineStatuscontroller2.default.create);
    this.router.get("/:id", _timeLineStatuscontroller2.default.find);
    this.router.post("/:id/edit", _timeLineStatuscontroller2.default.update);
    this.router.post("/:id/delete", _timeLineStatuscontroller2.default.delete);
    
  }
}

exports. default = new TimeLineStatusRouter().router;
