import joi from "joi";
import {
  filename,
  bids,
  bid,
  category_code,
  image,
  price,
  title,
  available,
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
    console.log(error);
    return interalServerError(res);
  }
};

export const updateBook = async (req, res) => {
  try {
    const fileData = req.file;
    console.log(fileData?.path);
    console.log(req.body);
    const { error } = joi
      .object({
        bid,
      })
      .validate({ bid: req.body.bid });
    if (error) {
      // Khi mà lỡ khi client nhập thiếu trường mà lỡ upload ảnh lên cloudinary thì dòng lệnh 39 40 sẽ xóa ảnh đó trên cloud.
      if (fileData) {
        cloudinary.uploader.destroy(fileData.filename);
      }
      return badRequest(error.details[0].message, res);
    }
    const response = await services.updateBook(req.body, fileData);
    return res.status(200).json(response);
  } catch (error) {
    return interalServerError(res);
  }
};

export const deleteBook = async (req, res) => {
  try {
    const { error } = joi
      .object({
        bids,
        filename,
      })
      .validate(req.query);
    if (error) {
      return badRequest(error.details[0].message, res);
    }
    const response = await services.deleteBook(
      req.query.bids,
      req.query.filename
    );
    return res.status(200).json(response);
  } catch (error) {
    return interalServerError(res);
  }
};
