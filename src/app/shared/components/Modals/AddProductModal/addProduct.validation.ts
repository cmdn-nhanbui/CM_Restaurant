import Joi from 'joi';

const addProductSchema = Joi.object({
  productName: Joi.string().min(3).max(50).required().label('Product Name'),
  price: Joi.number().min(1000).required().label('Price').messages({
    'number.base': '{{#label}} must be a number',
    'number.min': '{{#label}} must be at least 1.000',
    'any.required': '{{#label}} is required',
  }),
  quantity: Joi.number().allow(null).empty('').optional().label('Quantity').messages({
    'number.base': '{{#label}} must be a number',
  }),
});

export default addProductSchema;
