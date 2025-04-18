const Order = require("../models/OrderBooking")
const Reservation = require('../models/Reservation');

//@desc Get all orders from reservation
//@route GET /api/v1/reservations/:reservationId/order
//@access  Public 
exports.getOrders = async (req, res, next) =>{
    let query;
    console.log(req.params.reservationId)
    query = Order.find({ reservation: req.params.reservationId }).populate('reservation')
    try {
        const order = await query;

        res.status(200).json({
            success: true,
            count: order.length,
            data: order
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Cannot get Menu" });
    }
}

exports.addOrder = async (req, res, next) => {
    
    let query;
    console.log(req.params.reservationId)
    query = Order.find({ reservation: req.params.reservationId }).populate('reservation')

    try {

        req.body.reservation = req.params.reservationId;
        console.log(req.params);
        const reservation = await Reservation.findById(req.params.reservationId);

        const order = await Order.create(req.body);

        res.status(200).json({
            success: true,
            data: order
        });

    } catch (error) {
        console.log(error.stack);
        return res.status(500).json({ success: false, message: "Cannot create Order" });
    }
};