import Joi from 'joi';

const formLoginValidation = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .label('email'),
  password: Joi.string().min(6).required().label('password'),
});

export default formLoginValidation;
