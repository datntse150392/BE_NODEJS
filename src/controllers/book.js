import { interalServerError } from "../middewares/handleError";
const services = require("../services");
export const getBook = async (req, res) => {
  try {
    const response = await services.getBook(req.query);
    return res.status(200).json(response);
  } catch (error) {
    return interalServerError(res);
  }
};
