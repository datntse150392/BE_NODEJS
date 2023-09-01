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

export const notAuth = (err, res, isExpired) => {
  const error = createError.Unauthorized(err); // Error 401
  return res.status(error.status).json({
    err: isExpired ? 1 : 0,
    mes: error.message,
  });
};
