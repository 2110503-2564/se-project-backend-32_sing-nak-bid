const mongoose = require("mongoose");

const OrderBookingSchema = new mongoose.Schema({
  reservation: {
    type: mongoose.Schema.ObjectId,
    ref: "Reservation",
    required: true,
  },
  restaurant: {
      type: mongoose.Schema.ObjectId,
      ref: "Restaurant",
      required: true,
  },
  checkInStatus: {
    type: Boolean,
    default: false,
  },
  checkInTime: {
    type: Date,
    default: null,
  },
  totalPrice: {
    type: Number,
    required: true,
    min: 0,
  },
  phoneNumber: {
    type: String,
    required: true,
    match: /^[0-9]{9,15}$/,
  },
  emailUser:{
    type: String
  },
  status: {
    type: String,
    enum: ["pending","preparing", "completed", "cancelled"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

  // เพิ่ม orderItems 
  orderItems: [
    {
      menuItem: {
        type: mongoose.Schema.ObjectId,
        ref: "MenuItem",
        required: true,
      },
      menuName:{
        type: String
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
      note: {
        type: String,
        default: "",
      },
    },
  ],
});

module.exports = mongoose.model("OrderBooking", OrderBookingSchema);

