import controller from "../controller/timeLineStatus.controller";
import { Router } from "express";

import routerMiddleware from "../middleware/router.middleware";
class TimeLineStatusRouter {
  public router!: Router;
  constructor() {
    this.router = Router();
    // this.router.use(routerMiddleware.authenticated);
    this.routers();
  }

  private routers() {
    this.router.get("/search/", controller.search);
    this.router.get("/", controller.all);
    this.router.post("/", controller.create);
    this.router.get("/:id", controller.find);
    this.router.post("/:id/edit", controller.update);
    this.router.post("/:id/delete", controller.delete);
    
  }
}

export default new TimeLineStatusRouter().router;
