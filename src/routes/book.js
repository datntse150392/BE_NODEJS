const router = require("express").Router();
const controller = require("../controllers");
const { isAdmin } = require("../middewares/verify_role");
const { default: verifyToken } = require("../middewares/verify_token");
// PUBLIC ROUTES
router.get("/", controller.getBook);
// PRIVATE ROUTES
router.use(verifyToken);
router.use(isAdmin);
router.post("/createNewBook", controller.createNewBook);
// Sẽ có 2 cách viết middeware để check author
module.exports = router;
