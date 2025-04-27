const Rating = require("../models/Rating")
const Reservation = require('../models/Reservation');
const Restaurant = require('../models/Restaurant')

//@desc Get all ratingss of the user
//@route GET /api/v1/restaurants/:restaurantId/rating
//@access  Public
exports.getRatings = async (req, res, next) => {
  try {
    const rating = await Rating.find({restaurant:req.params.RestaurantId}).populate({
        path: 'restaurant',
        select: 'name address phone'
    });
    console.log(req.params.RestaurantId)
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


//@desc Get one rating of the user
//@route GET /api/v1/restaurants/:restaurantId/rating/:ratingId
//@access  Public
exports.getRating = async (req, res, next) =>{
    let query;
    console.log(req.params.RestaurantId)
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

//@desc Create a Rating
//@route POST /api/v1/restaurants/:restaurantId/rating
//@access  Private
exports.addRating = async (req, res, next) => {
    try {
        req.body.restaurant = req.params.RestaurantId;
        req.body.user = req.user.id;
        const restaurant = await Restaurant.findById(req.params.RestaurantId);
        if(!restaurant){
            return res.status(404).json({ success: false, message: `No Restaurant with the id of ${req.params.RestaurantId}` });
        } 
        console.log(req.params.RestaurantId);
        const rating = await Rating.create(req.body);
        res.status(200).json({
            success: true,
            data: rating
        });

    } catch (error) {
        console.log(error.stack);
        return res.status(500).json({ success: false, message: "Cannot create Rating" });
    }
};

//@desc Update a Rating
//@route PUT /api/v1/restaurants/:restaurantId/rating/:ratingId
//@access  Private
exports.updateRating = async (req, res, next) => {
    try {
        let rating = await Rating.findById(req.params.id).populate('restaurant')
        if (!rating) {
            return res.status(404).json({ success: false, message: `No Rating with the id of ${req.params.id}` });
        }
        if(rating.user.toString() !== req.user.id){
            return res.status(401).json({ success: false, message: `User ${req.user.id} is not authorized to update this order`});
        }
        rating = await Rating.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true
              });
        res.status(200).json({
            success: true,
            data: rating
        });

    } catch (error) {
        console.log(error.stack);
        return res.status(500).json({ success: false, message: "Cannot update Rating" });
    }
};


//@desc Delete a Rating
//@route DELETE /api/v1/restaurants/:restuarantId/rating/:ratingId
//@access  Private
exports.deleteRating = async (req, res, next) => {
    try {
        const rating = await Rating.findById(req.params.id).populate('restaurant');
        console.log(rating)
        if (!rating) {
            return res.status(404).json({ success: false, message: `No rating with the id of ${req.params.id}` });
        }
        if(rating.user.toString()!== req.user.id && req.user.role === 'user'){
            return res.status(401).json({ success: false, message: `User ${req.user.id} is not authorized to delete this order`});
        }

        await rating.deleteOne();
        
        res.status(200).json({
            success: true,
            data: {}
        });

    } catch (error) {
        console.log(error.stack);
        return res.status(500).json({ success: false, message: "Cannot delete Rating" });
    }
};