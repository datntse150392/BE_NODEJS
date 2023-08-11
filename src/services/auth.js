const db = require("../models");
export const register = () =>
  new Promise((resolve, reject) => {
    try {
      resolve({
        err: 0,
        mes: "register service",
      });
      console.log("after resolve");
    } catch (error) {
      reject(error);
    }
  });
