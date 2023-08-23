const createError = require("http-errors");
export const badRequest = (err, res) => {
  const error = createError.BadRequest(err);
  return res.status(error.status).json({
    err: 1,
    mes: error.message,
  });
};

export const interalServerError = (res) => {
  const error = createError.InternalServerError();
  return res.status(error.status).json({
    err: 1,
    mes: error.message,
  });
};

export const notFound = (res) => {
  const error = createError.NotFound("This route is not defined");
  return res.status(error.status).json({
    err: 1,
    mes: error.message,
  });
};
