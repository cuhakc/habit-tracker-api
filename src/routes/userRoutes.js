const router = require("express").Router();
const { auth } = require("../middleware/auth");
const { validate } = require("../middleware/validate");
const { updateProfileSchema } = require("../validation/userValidation");
const { getProfile, updateProfile } = require("../controllers/userController");

router.get("/profile", auth, getProfile);
router.put("/profile", auth, validate(updateProfileSchema), updateProfile);

module.exports = router;