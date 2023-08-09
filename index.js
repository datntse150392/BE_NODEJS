const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methodsL: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());
// Khi mà 1 client gửi không phải là một chuỗi json. Ví dụ nó là một object hay một gì đó -> thì dòng 15 sẽ dịch nó ra thành json
app.use(express.urlencoded({ extended: true }));

//Route
app.use("/", (req, res) => {
  return res.send("SERVER ON");
});

const PORT = process.env.PORT || 8080;
const listener = app.listen(PORT, () => {
  console.log("SERVER listening on port: " + listener.address().port);
});
