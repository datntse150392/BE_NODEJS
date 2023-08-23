import joi from "joi";
import { email, password } from "../helper/joi_schema";
import { interalServerError, badRequest } from "../middewares/handleError";

const services = require("../services");
export const register = async (req, res) => {
  try {
    const { error } = joi.object({ email, password }).validate(req.body);
    if (error) {
      return badRequest(error.details[0].message, res);
    }
    const response = await services.register(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return interalServerError(res);
  }
};

export const login = async (req, res) => {
  try {
    const { error } = joi.object({ email, password }).validate(req.body);
    if (error) {
      return badRequest(error.details[0].message, res);
    }
    const response = await services.login(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return interalServerError(res);
  }
};
