const express = require('express');

const {getReservations, getReservation, addReservation, updateReservation, deleteReservation} = require('../controllers/reservations');

const router = express.Router({mergeParams:true});

const orderRouter = require('./order')
const {protect,authorize} = require('../middleware/auth');

router.use('/:reservationId/order/',orderRouter);
router.route('/').get(protect, getReservations).post(protect, authorize('admin','user'),addReservation);
router.route('/:id').get(protect,getReservation).put(protect, authorize('admin','user','manager'),updateReservation).delete(protect, authorize('admin','user','manager'),deleteReservation);


module.exports=router;