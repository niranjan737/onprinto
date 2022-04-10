import { body } from 'express-validator'

const ProductaddValidationRules = () => {
  return [
    body('name').isLength({ min: 1 }).withMessage('name required'),
    body('status').isIn(['0', '1', '']),
  ]
}

export { ProductaddValidationRules }
