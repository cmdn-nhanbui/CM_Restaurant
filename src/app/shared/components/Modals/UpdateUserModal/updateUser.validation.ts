import Joi from 'joi';

export const updateUserValidation = Joi.object({
  userName: Joi.string().required().min(5),
  phoneNumber: Joi.string().pattern(/^\d+$/).required().messages({
    'string.pattern.base': 'Phone number must contain only digits',
    'string.empty': 'Phone number is required',
  }),
  newPassword: Joi.string()
    .allow('')
    .custom((value, helpers) => {
      if (!value) return value;
      const regexes = [
        { regex: /[a-z]/, label: 'lowercase letter' },
        { regex: /[A-Z]/, label: 'uppercase letter' },
        { regex: /\d/, label: 'number' },
        { regex: /[!@#$%^&*]/, label: 'special character' },
      ];

      for (const { regex, label } of regexes) {
        if (!regex.test(value)) {
          return helpers.error('any.invalid', { message: `Password must include at least one ${label}.` });
        }
      }

      if (value.length < 6) {
        return helpers.error('string.min', { limit: 6 });
      }

      return value;
    })
    .messages({
      'string.min': 'Password must be at least {#limit} characters long.',
      'any.invalid': '{{#message}}',
    })
    .label('New Password'),
  gender: Joi.boolean(),
});

export const createUserValidation = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .label('email'),
  userName: Joi.string().required().min(5),
  phoneNumber: Joi.string().pattern(/^\d+$/).required().messages({
    'string.pattern.base': 'Phone number must contain only digits',
    'string.empty': 'Phone number is required',
  }),

  password: Joi.string()
    .min(6)
    .pattern(new RegExp('(?=.*[a-z])'))
    .pattern(new RegExp('(?=.*[A-Z])'))
    .pattern(new RegExp('(?=.*\\d)'))
    .pattern(new RegExp('(?=.*[!@#$%^&*])'))
    .required()
    .label('Password')
    .messages({
      'string.pattern.base':
        'Password must include at least one lowercase letter, one uppercase letter, one number, and one special character.',
    }),
  gender: Joi.boolean(),
});
