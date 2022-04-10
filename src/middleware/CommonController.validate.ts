import { validationResult } from 'express-validator'
import { Request, Response } from 'express'

const validate = (req: Request, res: Response, next: Function) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }
}

export { validate }
