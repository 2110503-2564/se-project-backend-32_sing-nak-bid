const mongoose = require("mongoose");

const AllergenSchema = new mongoose.Schema({
  name: {
    type: [String],
    required: true,
    unique: true,
    trim: true
  },
  description: {
    type: [String],
    required: true //อธิบายรายละเอียดว่าส่วนผสมนี้ทำให้แพ้ได้ไงไรงี้
  }
});

module.exports = mongoose.model("Allergen", AllergenSchema);

