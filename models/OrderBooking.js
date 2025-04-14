const mongoose = require("mongoose");

const OrderBookingSchema = new mongoose.Schema({
  reservation: {
    type: mongoose.Schema.ObjectId,
    ref: "Reservation",
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
  status: {
    type: String,
    enum: ["booked", "confirmed", "checked-in", "preparing", "completed", "no-show", "cancelled"],
    default: "booked",
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

