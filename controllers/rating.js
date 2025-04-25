const Rating = require("../models/Rating")
const Reservation = require('../models/Reservation');
const Restaurant = require('../models/Restaurant')

//@desc Get all orders of the user
//@route GET /api/v1/restaurant/:restaurantId/rating
//@access  Public
exports.getRatings = async (req, res, next) => {
  try {
    const rating = await Rating.find({restaurant:req.params.id})
    console.log(req.params.id)
    return res.status(200).json({
        success: true,
        count : rating.length,
        data : rating
      });
  } catch (error) {
    console.error("Error getting ratings:", error);
    return res.status(500).json({
      success: false,
      message: "Cannot get Rating",
    });
  }
};


//@desc Get all orders of the user
//@route GET /api/v1/restaurant/:restaurantId/rating/:ratingId
//@access  Private
exports.getRating = async (req, res, next) =>{
    let query;
    console.log(req.params.restaurantId)
    query = Rating.findById(req.params.id).populate({
        path: 'restaurant',
        select: 'name address phone'
    });
    try {
        const rating = await query;

        res.status(200).json({
            success: true,
            data: rating
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Cannot get Rating" });
    }
}

//@desc Create an Rating
//@route POST /api/v1/reservations/:reservationId/order
//@access  Private
exports.addRating = async (req, res, next) => {
    try {
        req.body.restaurantId = req.params.restaurantId;
        req.body.user = req.user.id;
        const restaurant = Restaurant.findById(req.params.restaurantId);
        if(!restaurant){
            return res.status(404).json({ success: false, message: `No Restaurant with the id of ${req.params.restaurantId}` });
        } 
        console.log(req.params.restaurantId);
        const order = await Rating.create(req.body);
        res.status(200).json({
            success: true,
            data: order
        });

    } catch (error) {
        console.log(error.stack);
        return res.status(500).json({ success: false, message: "Cannot create Rating" });
    }
};

//@desc Update an Rating
//@route PUT /api/v1/reservations/:reservationId/order/:orderId
//@access  Private
exports.updateRating = async (req, res, next) => {
    try {
        let order =await Rating.findById(req.params.id).populate('reservation')
        if (!order) {
            return res.status(404).json({ success: false, message: `No Rating with the id of ${req.params.id}` });
          }
        if(order.reservation.user.toString()!== req.user.id && req.user.role === 'user'){
            return res.status(401).json({ success: false, message: `User ${req.user.id} is not authorized to update this order`});
        }
        order = await Rating.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true
              });
        res.status(200).json({
            success: true,
            data: order
        });

    } catch (error) {
        console.log(error.stack);
        return res.status(500).json({ success: false, message: "Cannot update Rating" });
    }
};


//@desc Delete an Rating
//@route DELETE /api/v1/reservations/:reservationId/order/:orderId
//@access  Private
exports.deleteRating = async (req, res, next) => {
    try {
        const order = await Rating.findById(req.params.id).populate('reservation');
        console.log(order)
        if (!order) {
            return res.status(404).json({ success: false, message: `No order with the id of ${req.params.id}` });
        }
        if(order.reservation.user.toString()!== req.user.id && req.user.role === 'user'){
            return res.status(401).json({ success: false, message: `User ${req.user.id} is not authorized to delete this order`});
        }

//         await order.deleteOne();
//         res.status(200).json({
//             success: true,
//             data: {}
//         });

    } catch (error) {
        console.log(error.stack);
        return res.status(500).json({ success: false, message: "Cannot delete Rating" });
    }
};