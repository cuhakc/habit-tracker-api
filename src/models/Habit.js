const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    name: { type: String, required: true, trim: true, minlength: 2, maxlength: 100 },
    description: { type: String, default: "", maxlength: 500 },

    weeklyStatus: {
      mon: { type: Boolean, default: false },
      tue: { type: Boolean, default: false },
      wed: { type: Boolean, default: false },
      thu: { type: Boolean, default: false },
      fri: { type: Boolean, default: false },
      sat: { type: Boolean, default: false },
      sun: { type: Boolean, default: false }
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Habit", habitSchema);