const user = require("./user");
const auth = require("./auth");
const initRoutes = (app) => {
  app.use("/api/v1/user", user);
  app.use("/api/v1/auth", auth);

  return app.use("/", (req, res) => {
    return res.send("SERVER ON");
  });
};
module.exports = initRoutes;
