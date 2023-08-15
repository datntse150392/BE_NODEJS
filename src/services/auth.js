const db = require("../models");
// bcrypt.js use hashing password
const bcrypt = require("bcryptjs");

// json web token: Giả sử như phía sever cần một số thông tin khi BE xử lý, ví dụ khi có một user đăng kí tài khoản mới thì bên FE muốn nhận 1 số thông tin như email để có thể phân quyền...
const jwt = require("jsonwebtoken");

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
      const token = response[1]
        ? jwt.sign(
            {
              email: response[0].email,
              password: response[0].password,
              role_code: response[0].role_code,
            },
            process.env.JWT_SECRET,
            { expiresIn: "5d" }
          )
        : null;
      resolve({
        err: response[1] ? 0 : 1,
        mes: response[1]
          ? "register successfull"
          : "email is already registered",
        token: token,
      });
    } catch (error) {
      reject(error);
    }
  });

export const login = ({ email, password }) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.findOne({
        where: { email },
        raw: true,
      });
      console.log(response);
      const isChecked =
        response && bcrypt.compareSync(password, response.password);
      const token = isChecked
        ? jwt.sign(
            {
              email: response.email,
              password: response.password,
              role_code: response.role_code,
            },
            process.env.JWT_SECRET,
            { expiresIn: "5d" }
          )
        : null;
      resolve({
        err: token ? 0 : 1,
        mes: token
          ? "login successfull"
          : response
          ? "Password is wrong"
          : "Email has been registered",
        access_token: token && `Bearer ${token}`,
      });
    } catch (error) {
      reject(error);
    }
  });
