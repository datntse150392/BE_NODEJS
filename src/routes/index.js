const user = require("./user");
const auth = require("./auth");
const insert = require("./insert");
const book = require("./book");
const { notFound } = require("../middewares/handleError");
const initRoutes = (app) => {
  app.use("/api/v1/user", user);
  app.use("/api/v1/auth", auth);
  app.use("/api/v1/insert", insert);
  app.use("/api/v1/book", book);

  return app.use(notFound);
};
module.exports = initRoutes;
