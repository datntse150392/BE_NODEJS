const services = require("../services");
export const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      // bad request 400
      return res.status(400).json({ err: 1, mes: "Missing payloadss" });
    }
    const response = await services.register(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ err: -1, mes: "Internal Server Error" });
  }
};
