const { getCurrent } = require("../controllers");
const { isAdmin, isModerator } = require("../middewares/verify_role");
const { default: verifyToken } = require("../middewares/verify_token");
const router = require("express").Router();
// PUBLIC ROUTES

// PRIVATE ROUTES
// Sẽ có 2 cách viết middeware để check author
router.use(verifyToken);
// router.use(isModerator);
router.get("/", getCurrent);

module.exports = router;
