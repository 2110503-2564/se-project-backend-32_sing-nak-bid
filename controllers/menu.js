const Reservation = require('../models/Reservation');
const Restaurant = require('../models/Restaurant');
const MenuItem = require('../models/MenuItem')

exports.getMenus = async (req, res, next) => {
    let query;
    query = MenuItem.find({ restaurant: req.RestaurantId });
    try {
        const Menu = await query;

        res.status(200).json({
            success: true,
            count: Menu.length,
            data: Menu
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Cannot get Menu" });
    }
}