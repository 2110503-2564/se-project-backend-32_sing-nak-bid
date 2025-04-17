const Order = require("../models/OrderBooking")
const Reservation = require('../models/Reservation');


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
    try {

        req.body.reservation = req.params.Order.Reservation;

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