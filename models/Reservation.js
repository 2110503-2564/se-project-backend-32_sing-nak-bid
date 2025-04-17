const mongoose = require("mongoose");

const ReservationSchema = new mongoose.Schema({
  reservationDateTime: {
    type: Date,
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  restaurant: {
    type: mongoose.Schema.ObjectId,
    ref: "Restaurant",
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "cancelled"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
},
{
  toJSON:{virtuals:true},
  toObject:{virtuals:true}
});

ReservationSchema.virtual('orderItems', {
  ref: 'OrderBooking',
  localField: '_id',
  foreignField: 'reservation',
  justOne: false
});


module.exports = mongoose.model("Reservation", ReservationSchema);

