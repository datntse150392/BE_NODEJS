const router = require("express").Router();
const controller = require("../controllers");
// PUBLIC ROUTES
router.get("/", controller.getBook);
// PRIVATE ROUTES
// Sẽ có 2 cách viết middeware để check author
module.exports = router;
