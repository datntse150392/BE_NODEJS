import { interalServerError } from "../middewares/handleError";
const services = require("../services");
export const getCurrent = async (req, res) => {
  try {
    const { id } = req.user;
    const response = await services.getOne(id);
    return res.status(200).json(response);
  } catch (error) {
    console.log("Failed to get current");
    return interalServerError(res);
  }
};
