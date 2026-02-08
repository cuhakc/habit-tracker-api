const mongoose = require("mongoose");
const Habit = require("../models/Habit");
const { asyncHandler } = require("../utils/asyncHandler");

const createHabit = asyncHandler(async (req, res) => {
  const habit = await Habit.create({
    owner: req.user._id,
    name: req.body.name,
    description: req.body.description ?? "",
    weeklyStatus: req.body.weeklyStatus
  });

  res.status(201).json({ message: "Habit created", habit });
});

const getHabits = asyncHandler(async (req, res) => {
  const habits = await Habit.find({ owner: req.user._id }).sort({ createdAt: -1 });
  res.json({ habits });
});

const getHabitById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) return res.status(400).json({ message: "Invalid habit id" });

  const habit = await Habit.findOne({ _id: id, owner: req.user._id });
  if (!habit) return res.status(404).json({ message: "Habit not found" });

  res.json({ habit });
});

const updateHabit = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) return res.status(400).json({ message: "Invalid habit id" });

  const habit = await Habit.findOneAndUpdate(
    { _id: id, owner: req.user._id },
    { $set: req.body },
    { new: true, runValidators: true }
  );

  if (!habit) return res.status(404).json({ message: "Habit not found" });

  res.json({ message: "Habit updated", habit });
});

const deleteHabit = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) return res.status(400).json({ message: "Invalid habit id" });

  const habit = await Habit.findOneAndDelete({ _id: id, owner: req.user._id });
  if (!habit) return res.status(404).json({ message: "Habit not found" });

  res.json({ message: "Habit deleted" });
});

module.exports = { createHabit, getHabits, getHabitById, updateHabit, deleteHabit };