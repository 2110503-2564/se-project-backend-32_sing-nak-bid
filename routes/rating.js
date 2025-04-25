const express = require('express');

const {getRatings, getRating, addRating, deleteRating, updateRating} = require('../controllers/rating');

const router = express.Router({mergeParams:true});

const {protect,authorize} = require('../middleware/auth');


router.route('/').get(getRatings)
// .post(protect, addRating);
// router.route('/:id').get(getRating).put(protect, updateRating).delete(protect, deleteRating);

module.exports=router;