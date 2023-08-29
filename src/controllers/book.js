import joi from "joi";
import {
  available,
  category_code,
  image,
  price,
  title,
} from "../helper/joi_schema";
import { badRequest, interalServerError } from "../middewares/handleError";
const services = require("../services");
export const getBook = async (req, res) => {
  try {
    const response = await services.getBook(req.query);
    return res.status(200).json(response);
  } catch (error) {
    return interalServerError(res);
  }
};

export const createNewBook = async (req, res) => {
  try {
    const { error } = joi
      .object({
        available,
        category_code,
        image,
        price,
        title,
      })
      .validate(req.body);
    if (error) {
      return badRequest(error.details[0].message, res);
    }
    const response = await services.createNewBook(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return interalServerError(res);
  }
};
