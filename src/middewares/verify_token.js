import jwt, { TokenExpiredError } from "jsonwebtoken";
import { notAuth } from "./handleError";

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return notAuth("Require Authorization", res);
  const access_token = token.split(" ")[1];
  jwt.verify(access_token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      const isExpired = err instanceof TokenExpiredError;
      if (isExpired) {
        return notAuth("Access token maybe expired", res, isExpired);
      }
      if (!isExpired) {
        return notAuth("Access token maybe invalid", res, isExpired);
      }
    }
    req.user = user;
    next();
  });
};
export default verifyToken;
