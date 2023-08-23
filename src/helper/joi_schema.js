const joi = require("joi");

// export const email = joi
//   .string()
//   .email({ minDomainSegments: 2, tlds: { allow: ["com"] } })
//   .required();

// Check input with patern email.com
export const email = joi.string().pattern(new RegExp("gmail.com$")).required();
// export const password = joi
//   .string()
//   .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
//   .required();
// check input with patern password
export const password = joi.string().min(6).required();
