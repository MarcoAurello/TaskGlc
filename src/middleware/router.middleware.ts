import { Request, Response, NextFunction } from 'express'

class RouterMiddleware {
  public authenticated (req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers

    next()
  }

  public role () {

  }
}

export default new RouterMiddleware()
