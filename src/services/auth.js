const db = require("../models");
// bcrypt.js use hashing password
const bcrypt = require("bcryptjs");

const hashPassword = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(8));

export const register = ({ email, password }) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.findOrCreate({
        where: { email },
        defaults: {
          email: email,
          password: hashPassword(password),
        },
      });
      resolve({
        err: response[1] ? 0 : 1,
        mes: response[1]
          ? "register successfull"
          : "email is already registered",
      });
      resolve({
        err: 0,
        mes: "register service",
      });
      console.log("after resolve");
    } catch (error) {
      reject(error);
    }
  });
