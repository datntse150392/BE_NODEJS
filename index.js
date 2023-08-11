const express = require("express");
const cors = require("cors");
// import cors from "cors";
require("dotenv").config();
const initRoutes = require("./src/routes");
const app = express();
// connectionDB
require("./connectionDB");
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());
// Khi mà 1 client gửi không phải là một chuỗi json. Ví dụ nó là một object hay một gì đó -> thì dòng 15 sẽ dịch nó ra thành json
app.use(express.urlencoded({ extended: true }));

initRoutes(app);

const PORT = process.env.PORT || 8080;
const listener = app.listen(PORT, () => {
  console.log("SERVER listening on port: " + listener.address().port);
});
