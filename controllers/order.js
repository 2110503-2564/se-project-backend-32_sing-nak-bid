const OrderBooking = require("../models/OrderBooking");
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

//@desc Get an orders from reservation
//@route GET /api/v1/reservations/:reservationId/order/:orderId
//@access  Private
exports.getOrder = async (req, res, next) =>{
    let query;
    console.log(req.params.reservationId)
    query = Order.findById(req.params.id).populate('reservation')
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

//@desc Create an Order
//@route POST /api/v1/reservations/:reservationId/order
//@access  Private
exports.addOrder = async (req, res, next) => {
    try {
        req.body.reservation = req.params.reservationId;
        console.log(req.params);
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

//@desc Update an Order
//@route PUT /api/v1/reservations/:reservationId/order/:orderId
//@access  Private
exports.updateOrder = async (req, res, next) => {
    try {
        let order =await Order.findById(req.params.id).populate('reservation')
        if (!order) {
            return res.status(404).json({ success: false, message: `No Order with the id of ${req.params.id}` });
          }
        if(order.reservation.user.toString()!== req.user.id && req.user.role === 'user'){
            return res.status(401).json({ success: false, message: `User ${req.user.id} is not authorized to delete this order`});
        }
        order = await Order.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true
              });
        res.status(200).json({
            success: true,
            data: order
        });

    } catch (error) {
        console.log(error.stack);
        return res.status(500).json({ success: false, message: "Cannot update Order" });
    }
};


//@desc Delete an Order
//@route DELETE /api/v1/reservations/:reservationId/order/:orderId
//@access  Private
exports.deleteOrder = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id).populate('reservation');
        console.log(order)
        if (!order) {
            return res.status(404).json({ success: false, message: `No order with the id of ${req.params.id}` });
        }
        if(order.reservation.user.toString()!== req.user.id && req.user.role === 'user'){
            return res.status(401).json({ success: false, message: `User ${req.user.id} is not authorized to delete this order`});
        }

        await order.deleteOne();
        res.status(200).json({
            success: true,
            data: {}
        });

    } catch (error) {
        console.log(error.stack);
        return res.status(500).json({ success: false, message: "Cannot delete Reservation" });
    }
};