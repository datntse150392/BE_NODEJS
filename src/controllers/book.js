import joi from "joi";
import {
  available,
  category_code,
  image,
  price,
  title,
} from "../helper/joi_schema";
import { badRequest, interalServerError } from "../middewares/handleError";
const services = require("../services");
const cloudinary = require("cloudinary").v2;

export const getBook = async (req, res) => {
  try {
    const response = await services.getBook(req.query);
    return res.status(200).json(response);
  } catch (error) {
    return interalServerError(res);
  }
};

export const createNewBook = async (req, res) => {
  try {
    const fileData = req.file;

    console.log(fileData);
    const { error } = joi
      .object({
        available,
        category_code,
        image,
        price,
        title,
      })
      .validate({ ...req.body, image: fileData?.path });
    if (error) {
      // Khi mà lỡ khi client nhập thiếu trường mà lỡ upload ảnh lên cloudinary thì dòng lệnh 39 40 sẽ xóa ảnh đó trên cloud.
      if (fileData) {
        cloudinary.uploader.destroy(fileData.filename);
      }
      return badRequest(error.details[0].message, res);
    }
    const response = await services.createNewBook(req.body, fileData);
    return res.status(200).json(response);
  } catch (error) {
    return interalServerError(res);
  }
};
