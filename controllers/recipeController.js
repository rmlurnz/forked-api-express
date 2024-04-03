const Recipe = require("../models/recipeModel");
const mongoose = require("mongoose");

// Get all recipes
const getRecipes = async (req, res) => {
  const recipes = await Recipe.find({}).sort({ createdAt: -1 });

  res.status(200).json(recipes);
};

// Get a single recipe
const getRecipe = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ error: "No such recipe - not a valid mongoose ID" });
  }

  const recipe = await Recipe.findById(id);

  if (!recipe) {
    res.status(404).json({ error: "No recipe with that ID" });
  }

  res.status(200).json(recipe);
};

// Create a new recipe
const createRecipe = async (req, res) => {
  const { title, description } = req.body;

  let emptyFields = []

  if (!title) {
    emptyFields.push('title')
  }
  if (!description) {
    emptyFields.push('description')
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({
      error: 'Please fill in all fields',
      emptyFields
    })
  }

  // add doc to DB
  try {
    const recipe = await Recipe.create({ title, description });
    res.status(200).json(recipe);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a recipe
const deleteRecipe = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ error: "No such recipe - not a valid mongoose ID" });
  }

  const recipe = await Recipe.findOneAndDelete({ _id: id });

  if (!recipe) {
    res.status(404).json({ error: "No recipe with that ID" });
  }

  res.status(200).json(recipe);
};

// Update a recipe
const updateRecipe = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ error: "No such recipe - not a valid mongoose ID" });
  }

  const recipe = await Recipe.findOneAndUpdate({ _id: id }, { ...req.body });

  if (!recipe) {
    res.status(404).json({ error: "No recipe with that ID" });
  }

  res.status(200).json(recipe);
};

module.exports = {
  getRecipes,
  getRecipe,
  createRecipe,
  deleteRecipe,
  updateRecipe,
};
