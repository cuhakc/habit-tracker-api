const router = require("express").Router();
const { auth } = require("../middleware/auth");
const { validate } = require("../middleware/validate");
const { createHabitSchema, updateHabitSchema } = require("../validation/habitValidation");
const {
  createHabit,
  getHabits,
  getHabitById,
  updateHabit,
  deleteHabit
} = require("../controllers/habitController");

router.use(auth);

router.post("/", validate(createHabitSchema), createHabit);
router.get("/", getHabits);
router.get("/:id", getHabitById);
router.put("/:id", validate(updateHabitSchema), updateHabit);
router.delete("/:id", deleteHabit);

module.exports = router;