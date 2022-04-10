import { body, validationResult } from 'express-validator'

const CategoryaddValidationRules = () => {
  return [
    body('name').isLength({ min: 1 }).withMessage('name required'),
    body('status').isIn(['0', '1', '']),
  ]
}

export { CategoryaddValidationRules }
