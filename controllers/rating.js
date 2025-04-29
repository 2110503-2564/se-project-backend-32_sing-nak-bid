const Reservation = require('../models/Reservation');
const Restaurant = require('../models/Restaurant')

//@desc Get all ratingss of the user
//@route GET /api/v1/restaurants/:restaurantId/rating
//@access  Public
exports.getRatings = async (req, res, next) => {
    try {
      const restaurant = await Restaurant.findById(req.params.RestaurantId).select('ratings');
      if (!restaurant) {
        return res.status(404).json({ success: false, message: 'Restaurant not found' });
      }
      res.status(200).json({
        success: true,
        count: restaurant.ratings.length,
        data: restaurant.ratings
      });
    } catch (error) {
      console.error(error.stack);
      return res.status(500).json({ success: false, message: "Cannot get ratings" });
    }
  };
  


//@desc Get one rating of the user
//@route GET /api/v1/restaurants/:restaurantId/rating/:ratingId
//@access  Public
exports.getRating = async (req, res, next) => {
    try {
      const restaurant = await Restaurant.findById(req.params.RestaurantId).select('ratings');
      if (!restaurant) {
        return res.status(404).json({ success: false, message: 'Restaurant not found' });
      }
  
      const rating = restaurant.ratings.id(req.params.ratingId);
  
      if (!rating) {
        return res.status(404).json({ success: false, message: 'Rating not found' });
      }
  
      res.status(200).json({
        success: true,
        data: rating
      });
    } catch (error) {
      console.error(error.stack);
      return res.status(500).json({ success: false, message: "Cannot get rating" });
    }
  };
  

//@desc Create a Rating
//@route POST /api/v1/restaurants/:restaurantId/rating
//@access  Private
exports.addRating = async (req, res, next) => {
    try {
      const restaurant = await Restaurant.findById(req.params.RestaurantId);
      if (!restaurant) {
        return res.status(404).json({ success: false, message: 'Restaurant not found' });
      }
  
      const newRating = {
        user: req.user.id,
        score: req.body.score,
        comment: req.body.comment
      };
  
      restaurant.ratings.push(newRating);
      await restaurant.save();
  
      res.status(201).json({
        success: true,
        data: newRating
      });
    } catch (error) {
      console.error(error.stack);
      return res.status(500).json({ success: false, message: "Cannot add rating" });
    }
  };
  
  
  

//@desc Update a Rating
//@route PUT /api/v1/restaurants/:restaurantId/rating/:ratingId
//@access  Private
exports.updateRating = async (req, res, next) => {
    try {
      const restaurant = await Restaurant.findById(req.params.RestaurantId);
      if (!restaurant) {
        return res.status(404).json({ success: false, message: 'Restaurant not found' });
      }
  
      const rating = restaurant.ratings.id(req.params.ratingId);
      if (!rating) {
        return res.status(404).json({ success: false, message: 'Rating not found' });
      }
  
      if (rating.user.toString() !== req.user.id) {
        return res.status(401).json({ success: false, message: 'Not authorized to update this rating' });
      }
  
      // Update fields
      if (req.body.score !== undefined) rating.score = req.body.score;
      if (req.body.comment !== undefined) rating.comment = req.body.comment;
  
      await restaurant.save();
  
      res.status(200).json({
        success: true,
        data: rating
      });
    } catch (error) {
      console.error(error.stack);
      return res.status(500).json({ success: false, message: "Cannot update rating" });
    }
  };
  


//@desc Delete a Rating
//@route DELETE /api/v1/restaurants/:restuarantId/rating/:ratingId
//@access  Private
exports.deleteRating = async (req, res, next) => {
  try {
    const restaurant = await Restaurant.findById(req.params.RestaurantId);
    if (!restaurant) {
      return res.status(404).json({ success: false, message: 'Restaurant not found' });
    }

    const rating = restaurant.ratings.id(req.params.id);
    if (!rating) {
      return res.status(404).json({ success: false, message: 'Rating not found' });
    }

    if (rating.user.toString() !== req.user.id && req.user.role === 'user') {
      return res.status(401).json({ success: false, message: 'Not authorized to delete this rating' });
    }

    restaurant.ratings.pull({ _id: req.params.id });
    await restaurant.save();

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    console.error(error.stack);
    return res.status(500).json({ success: false, message: "Cannot delete rating" });
  }
};

  