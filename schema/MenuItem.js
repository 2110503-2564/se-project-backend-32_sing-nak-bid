const mongoose = require("mongoose");

const MenuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a menu name."],
    unique: true,
    trim: true,
    maxlength: [50, "Menu name can't be more than 50 characters."]
  },
  price: {
    type: Number,
    required: [true, "Please add a menu price."],
    min: [0, "Menu price should be a positive number."]
  },
  description: {
    type: String,
    required: [true, "Please add a menu description."]
  },
  //เก็บ Ingredient เป็น Array
  ingredient: [{
    type: mongoose.Schema.ObjectId,
    ref: "Ingredient",
    required: true
  }],
  //เก็บ Allergens from User
  allergens: [{
    type: mongoose.Schema.ObjectId,
    ref: "Allergen"
  }],
  restaurant: {
    type: mongoose.Schema.ObjectId,
    ref: "Restaurant",
    required: true
  },
  available: {
    type: Boolean,
    default: true
  },
  recommended: {
    type: Boolean,
    default: false
  },
  orderCount: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model("MenuItem", MenuItemSchema);

