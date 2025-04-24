const OrderBooking = require("../models/OrderBooking");
const Order = require("../models/OrderBooking")
const Reservation = require('../models/Reservation');
const Restaurant = require('../models/Restaurant')

//@desc Get all orders of the user
//@route GET /api/v1/order
//@access  Private
exports.getOrders = async (req, res, next) => {
  try {
    if(req.user.role === 'user'){
        const orders = await OrderBooking.find()
      .populate({
        path: "reservation",
        match: { user: req.user.id }
      })
      .populate("orderItems.menuItem");

    // Filter out orders where reservation didn't match
    const userOrders = orders.filter(Order => Order.reservation !== null);
    res.status(200).json({
        success: true,
        count: userOrders.length,
        data: userOrders,
      });
    }
    else if(req.user.role === 'manager'){
      const orders = await OrderBooking.find()
  .populate({
    path: "restaurant",
    match: { managerId: req.user.id },
  })
  .populate("reservation");

// Filter out orders where restaurant is null
const userOrders = orders.filter(order => order.restaurant !== null);

    
    
    res.status(200).json({
        success: true,
        count: userOrders.length,
        data: userOrders,
      });
    }
    else {
        const orders = await OrderBooking.find()
      .populate({
        path: "reservation",
        populate: {
            path: 'restaurant', // this assumes reservation has a 'restaurant' field
          }
      })
      .populate("orderItems.menuItem");
    res.status(200).json({
        success: true,
        count: orders.length,
        data: orders,
      });
    }

    
  } catch (error) {
    console.error("Error getting orders:", error);
    return res.status(500).json({
      success: false,
      message: "Cannot get Order",
    });
  }
};


//@desc Get an orders from reservation
//@route GET /api/v1/reservations/:reservationId/order/:orderId
//@access  Private
exports.getOrder = async (req, res, next) =>{
    let query;
    console.log(req.params.reservationId)
    query = Order.findById(req.params.id).populate('reservation').populate('orderItems.menuItem');
    try {
        const order = await query;

        res.status(200).json({
            success: true,
            data: order
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Cannot get Order" });
    }
}

//@desc Create an Order
//@route POST /api/v1/reservations/:reservationId/order
//@access  Private
exports.addOrder = async (req, res, next) => {
    try {
        req.body.reservation = req.params.reservationId;
        req.body.user = req.user.id;
        console.log(req.params);
        const reservation = await Reservation.findById(req.params.reservationId).populate('orderItems');
        req.body.restaurant = reservation.restaurant;
        if(!reservation){
            return res.status(404).json({ success: false, message: `No Reservation with the id of ${req.params.reservationId}` });
        }
        if (reservation.orderItems.length >= 1 && req.user.role !== 'admin') {
            return res.status(400).json({ success: false, message: `The user with ID ${req.user.id} has already made a order`});
            }
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
            return res.status(401).json({ success: false, message: `User ${req.user.id} is not authorized to update this order`});
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
        return res.status(500).json({ success: false, message: "Cannot delete Order" });
    }
};