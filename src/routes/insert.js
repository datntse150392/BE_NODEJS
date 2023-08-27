const { insertData } = require("../controllers/insert");

const router = require("express").Router();
// PUBLIC ROUTES
// PRIVATE ROUTES
router.get("/", insertData);

module.exports = router;
