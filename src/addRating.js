const Reservation = require('../models/Reservation');
const Restaurant = require('../models/Restaurant')


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
  