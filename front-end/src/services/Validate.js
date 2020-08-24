import ReactJoiValidations from "react-joi-validation";

import Joi from "@hapi/joi";

ReactJoiValidations.setJoi(Joi);

const email = Joi.string()
  .regex(/\S+@\S+\.\S+/)
  .messages({
    "string.pattern.base": "Email must be in a format <name>@<domain>",
    "string.empty": "Email is not allowed to be empty",
  });

const name = Joi.string()
  .regex(/^[^\s][a-zA-Z\s]*[a-zA-z]$/)
  .min(12)
  .messages({
    "string.empty": "Name is not allowed to be empty",
    "string.min": "Name length must be at least 12 characters long",
    "string.pattern.base":
      "Name must not contain any numbers, special characters or space in the start or in the end",
  });

const password = Joi.string()
  .pattern(/^.*(.*\d){6,}/)
  .messages({
    "string.empty": "Password is not allowed to be empty",
    "string.pattern.base": "Password must contain at least 6 numbers",
  });

const schemas = {
  email,
  name,
  password,
};

const validate = ({ field, value }) => {
  const { error } = schemas[field].validate(value);

  return error;
};

const handleField = ({ field, value, callback }) => {
  const error = validate({ field, value });

  if (!error) {
    callback({ value, error: null });
  } else {
    callback({ value, error: error.message });
  }
};

export { handleField };
