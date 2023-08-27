import { genarateCode } from "../helper/fn";

const db = require("../models");
const data = require("../../data/data.json");
export const insertData = () =>
  new Promise(async (resolve, reject) => {
    try {
      const categories = Object.keys(data);
      categories.forEach(async (item) => {
        await db.Category.create({
          code: genarateCode(item),
          value: item,
        });
      });

      const dataArr = Object.entries(data);
      dataArr.map((item) => {
        item[1].forEach(async (book) => {
          await db.Book.create({
            id: book.upc,
            title: book.bookTitle,
            price: book.bookPrice,
            available: book.available,
            image: book.imageUrl,
            description: book.bookDescription,
            category_code: genarateCode(item[0]),
          });
        });
      });
      resolve("OK");
    } catch (error) {
      reject(error);
    }
  });
