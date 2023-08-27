import { interalServerError } from "../middewares/handleError";
const services = require("../services");
export const insertData = async (req, res) => {
  try {
    const response = await services.insertData();
    return res.status(200).json(response);
  } catch (error) {
    console.log("gi");
    return interalServerError(res);
  }
};
