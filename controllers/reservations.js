const Reservation = require('../models/Reservation');
const Restaurant = require('../models/Restaurant');


exports.getReservations = async (req, res, next) => {
    let query;
    
    if (req.user.role !== 'admin') {
        query = Reservation.find({ user: req.user.id }).populate({
            path: 'restaurant',
            select: 'name address phone'
        });
    } else { 
        query = Reservation.find().populate({
            path: 'restaurant',
            select: 'name address phone'
        });
    }
    try {
        const reservations = await query;

        res.status(200).json({
            success: true,
            count: reservations.length,
            data: reservations
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Cannot find Reservation" });
    }
}


exports.getReservation = async (req, res, next) => {
    try {
        const reservation = await Reservation.findById(req.params.id).populate({
            path: 'restaurant',
            select: 'name address phone'
        });

        if (!reservation) {
            return res.status(404).json({ success: false, message: `No reservation with the id of ${req.params.id}` });
        }

        res.status(200).json({
            success: true,
            data: reservation
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Cannot find Reservation" });
    }
};



exports.addReservation = async (req, res, next) => {
    try {
        req.body.restaurant = req.params.RestaurantId;
        console.log(req.params);
        const restaurant = await Restaurant.findById(req.params.RestaurantId);
        if (!restaurant) {
            return res.status(404).json({ success: false, message: `No restaurant with the id of ${req.params.RestaurantId}` });
        }
        req.body.user = req.user.id;

        const existedReservations = await Reservation.find({user:req.user.id});
        if (existedReservations.length >= 3 && req.user.role !== 'admin') {
            return res.status(400).json({ success: false, message: `The user with ID ${req.user.id} has already made 3 reservations`});
        }
        const reservation = await Reservation.create(req.body);

        res.status(200).json({
            success: true,
            data: reservation
        });
    } catch (error) {
        console.log(error.stack);
        return res.status(500).json({ success: false, message: "Cannot create Reservation" });
    }
};



exports.updateReservation = async (req, res, next) => {
    try {
      let reservation = await Reservation.findById(req.params.id);
  
      if (!reservation) {
        return res.status(404).json({ success: false, message: `No reservation with the id of ${req.params.id}` });
      }
      if(reservation.user.toString()!== req.user.id && req.user.role !== 'admin'){
        console.log(reservation.user.toString());
        return res.status(401).json({ success: false, message: `User ${req.user.id} is not authorized to update this reservation`});
      }
  
      reservation = await Reservation.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
      });
  
      res.status(200).json({
        success: true,
        data: reservation
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, message: 'Cannot update Reservation' });
    }
  };


  
exports.deleteReservation = async (req, res, next) => {
    try {
        const reservation = await Reservation.findById(req.params.id);
        if (!reservation) {
            return res.status(404).json({ success: false, message: `No reservation with the id of ${req.params.id}` });
        }
        if(reservation.user.toString()!== req.user.id && req.user.role !== 'admin'){
            return res.status(401).json({ success: false, message: `User ${req.user.id} is not authorized to delete this reservation`});
          }

        await reservation.deleteOne();
        res.status(200).json({
            success: true,
            data: {}
        });

    } catch (error) {
        console.log(error.stack);
        return res.status(500).json({ success: false, message: "Cannot delete Reservation" });
    }
};

