const router = require("express").Router();
const controller = require("../controllers");
const uploadCloud = require("../middewares/uploader");
const { isAdmin, isCreatorOrAdmin } = require("../middewares/verify_role");
const { default: verifyToken } = require("../middewares/verify_token");
// PUBLIC ROUTES
router.get("/", controller.getBook);
// PRIVATE ROUTES
router.use(verifyToken);
router.use(isCreatorOrAdmin);
router.post(
  "/createNewBook",
  uploadCloud.single("image"),
  controller.createNewBook
);
router.put("/updateBook", uploadCloud.single("image"), controller.updateBook);
router.delete("/deleteBook", controller.deleteBook);

// Sẽ có 2 cách viết middeware để check author
module.exports = router;
