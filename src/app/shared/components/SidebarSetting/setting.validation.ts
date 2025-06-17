import Joi from 'joi';

export const changePasswordValidation = Joi.object({
  currentPassword: Joi.string().min(6).max(100).required().label('password'),
  newPassword: Joi.string()
    .min(6)
    .pattern(new RegExp('(?=.*[a-z])'))
    .pattern(new RegExp('(?=.*[A-Z])'))
    .pattern(new RegExp('(?=.*\\d)'))
    .pattern(new RegExp('(?=.*[!@#$%^&*])'))
    .required()
    .label('New Password')
    .messages({
      'string.pattern.base':
        'Password must include at least one lowercase letter, one uppercase letter, one number, and one special character.',
    }),
  confirmPassword: Joi.any()
    .equal(Joi.ref('newPassword'))
    .required()
    .label('confirm password')
    .messages({ 'any.only': 'Password and confirm password must match' }),
});

export const updateProfileValidation = Joi.object({
  userName: Joi.string().required().min(5),
  phoneNumber: Joi.string().pattern(/^\d+$/).required().messages({
    'string.pattern.base': 'Phone number must contain only digits',
    'string.empty': 'Phone number is required',
  }),
  gender: Joi.boolean(),
});
