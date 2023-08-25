const { getCurrent } = require("../controllers");
const { isAdmin, isModerator } = require("../middewares/verify_role");
const { default: verifyToken } = require("../middewares/verify_token");
const router = require("express").Router();
// PUBLIC ROUTES

// PRIVATE ROUTES
// Sẽ có 2 cách viết middeware
// router.use(verifyToken);
// router.use(isModerator);
router.get("/", [verifyToken, isAdmin], getCurrent);

module.exports = router;
