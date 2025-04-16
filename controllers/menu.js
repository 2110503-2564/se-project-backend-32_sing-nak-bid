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
exports.getMenu = async (req, res, next) => {
    try {
        const Menu = await MenuItem.findById(req.params.id).populate({
            path: 'restaurant',
            select: 'name address phone'
        });

        if (!Menu) {
            return res.status(404).json({ success: false, message: `No Menu with the id of ${req.params.id}` });
        }

        res.status(200).json({
            success: true,
            data: Menu
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Cannot find Menu" });
    }
};