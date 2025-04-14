const mongoose = require("mongoose");

const IngredientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add ingredient name"],
  },
  quantity: {
    type: Number,
    required: [true, "Please add quantity of ingredient"],
  },
  // Ingredient ไม่ควรน้อยกว่า 10 units ตาม Product Backlog
  minimum_ingredient: {
    type: Number,
    default: 10,
  },
  unit: {
    type: String,
    enum: ["g", "ml", "pcs", "kg", "liter"],
    default: "pcs",
  },
  restaurant: {
    type: mongoose.Schema.ObjectId,
    ref: "Restaurant",
    required: [true, "Ingredient must belong to a restaurant."] //เช็คในfieldนี้ว่าร้านไหนอะไรหมด,วัตถุดิบแต่ละร้านแยกกัน
  },
  is_out_of_stock: {
    type: Boolean,
    default: false,
  },
  updated_at: {
    type: Date, //เก็บเวลาอัพเดทงับพี่(ต้องมีไหมแต่เผื่อไว้ก่อน555?)
    default: Date.now,
  },
  allergens: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Allergen",
    },
  ],
});

// เพิ่ม pre-save hook เพื่ออัปเดต is_out_of_stock อัตโนมัติ
IngredientSchema.pre("save", function (next) {
  this.is_out_of_stock = this.quantity < this.minimum_ingredient;
  this.updated_at = Date.now();
  next();
});

module.exports = mongoose.model("Ingredient", IngredientSchema);


