const mongoose = require("mongoose");

const RestaurantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a restaurant name."],
      unique: true,
      trim: true,
      maxlength: [50, "Restaurant name cannot be more than 50 characters."],
    },
    address: {
      type: String,
      required: [true, "Please add a restaurant address"],
    },
    district: {
      type: String,
      required: [true, "Please add a restaurant district"],
    },
    province: {
      type: String,
      required: [true, "Please add a restaurant province"],
    },
    postalcode: {
      type: String,
      required: [true, "Please add a restaurant postalcode"],
      maxlength: [5, "Postal Code can not be more than 5 digits"],
    },

    tel: {
      type: String,
      required: [true, "Please add a restaurant Telephone number"],
    },
    region: {
      type: String,
      required: [true, "Please add a region"],
    },
    opentime: {
      type: String,
      required: [true, "Please add a restaurant open time"],
      match: [
        /^\d{2}:\d{2}$/,
        "Please enter a valid opening time in HH:mm format",
      ],
    },
    closetime: {
      type: String,
      required: [true, "Please add a restaurant close time"],
      match: [
        /^\d{2}:\d{2}$/,
        "Please enter a valid closing time in HH:mm format",
      ],
    },
    managerId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Please add a person to manage this restaurant"],
    },
    picture: {
      type: String,
    },
    ratings: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Rating",
      },
    ],
    averageRating: {
      type: Number,
      default: 0,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//Reverse populate with virtuals
RestaurantSchema.virtual("reservations", {
  ref: "Reservation",
  localField: "_id",
  foreignField: "restaurant",
  justOne: false,
});

RestaurantSchema.virtual("menuItems", {
  ref: "MenuItem",
  localField: "_id",
  foreignField: "restaurant",
  justOne: false,
});
RestaurantSchema.pre("save", function (next) {
  if (this.ratings.length > 0) {
    const total = this.ratings.reduce((sum, r) => sum + r.score, 0);
    this.averageRating = total / this.ratings.length;
  } else {
    this.averageRating = 0;
  }
  next();
});

// //2 อันด้านล่างคาดว่าต้องเปลี่ยน ref เพราะ ref = file name ต้องเปลี่ยนตามขื่อไฟล์ที่พี่เฟินตั้ง
// // order from delivery
// RestaurantSchema.virtual('orderItems',{
//     ref: 'OrderList',
//     localField: '_id',
//     foreignField: 'restaurant',
//     justOne:false
// })

// // order to restaurant
// RestaurantSchema.virtual('orderItems',{
//   ref: 'OrderList',
//   localField: '_id',
//   foreignField: 'restaurant',
//   justOne:false
// })

module.exports = mongoose.model("Restaurant", RestaurantSchema);
