const express = require('express');
const {getRestaurant,getRestaurants,createRestaurant,updateRestaurant,deleteRestaurant,getRestaurantsUser}  = require('../controllers/restaurants');
const router = express.Router(); 



//Include other resource routers
const reservationRouter = require('./reservations');
const menuRouter = require('./menu')
const ratingRouter = require('./rating')
const {protect,authorize} = require('../middleware/auth');

//Re-route into other resource routers
router.use('/:RestaurantId/reservations/',reservationRouter);
router.use('/:RestaurantId/menu/',menuRouter);
router.use('/:RestaurantId/rating/',ratingRouter)
router.route('/').get(getRestaurants).post(protect, authorize('admin'),createRestaurant);
router.route('/user').get(getRestaurantsUser)
router.route('/:id').get(getRestaurant).put(protect,authorize('admin'),updateRestaurant).delete(protect,authorize('admin'),deleteRestaurant);

module.exports=router; 