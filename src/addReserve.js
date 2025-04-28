const Reservation = require('../models/Reservation');
const Restaurant = require('../models/Restaurant');

//@desc Create a reservation
//@route POST /api/v1/restaurants/:id/reservations
//@access  Private
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