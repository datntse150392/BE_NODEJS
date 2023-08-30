import { Op } from "sequelize";
const db = require("../models");
import { v4 as genarateCode } from "uuid";
const cloudinary = require("cloudinary").v2;

// READ
export const getBook = ({ page, limit, order, name, available, ...query }) =>
  new Promise(async (resolve, reject) => {
    try {
      // ý nghĩa của việc dùng raw: true tức là sẽ lấy data theo một object thuần thay vì phải có những data của bên sequelize
      // nest: true ()
      const queries = { raw: true, nest: true };
      const offset = !page || +page <= 1 ? 0 : +page - 1;
      const fLimit = +limit || +process.env.LIMIT_BOOK;
      queries.offset = offset * fLimit;
      queries.limit = fLimit;
      if (order) queries.order = [order];
      if (name) query.title = { [Op.substring]: name };
      if (available) query.available = { [Op.between]: available };
      const response = await db.Book.findAndCountAll({
        where: query,
        ...queries,
        attributes: { exclude: "category_code" },
        include: [
          {
            model: db.Category,
            attributes: { exclude: "createdAt, updatedAt" },
            as: "categoryData",
          },
        ],
      });
      resolve({
        err: response ? 0 : 1,
        mes: response ? "Got" : "Cannot found books",
        bookData: response,
      });
    } catch (error) {
      reject(error);
    }
  });

//CREATE
export const createNewBook = (body, fileData) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Book.findOrCreate({
        where: { title: body?.title },
        defaults: { ...body, id: genarateCode(), image: fileData?.path },
      });
      resolve({
        err: response[1] ? 0 : 1,
        mes: response[1] ? "Created" : "Cannot create new Book",
      });
      if (fileData && !response[1]) {
        cloudinary.uploader.destroy(fileData.filename);
      }
    } catch (error) {
      reject(error);
      cloudinary.uploader.destroy(fileData.filename);
    }
  });
// UPDATE
export const updateBook = ({ bid, ...body }, fileData) =>
  new Promise(async (resolve, reject) => {
    try {
      if (fileData) {
        body.image = fileData?.path;
      }
      const response = await db.Book.update(body, {
        where: {
          id: bid,
        },
      });
      resolve({
        err: response[0] > 0 ? 0 : 1,
        mes:
          response[0] > 0
            ? `${response[0]} book updated`
            : "Cannot update a Book / Book ID not found",
      });
      if (fileData && response[0] === 0) {
        cloudinary.uploader.destroy(fileData.filename);
      }
    } catch (error) {
      reject(error);
      cloudinary.uploader.destroy(fileData.filename);
    }
  });
// DELETE
export const deleteBook = (bids) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Book.destroy({
        where: {
          id: bids,
        },
      });
      resolve({
        err: response > 0 ? 0 : 1,
        mes: `${response} book(s) deleted`,
      });
    } catch (error) {
      reject(error);
    }
  });
