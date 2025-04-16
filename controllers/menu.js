const MenuItem = require('../models/MenuItem');
const Restaurant = require('../models/Restaurant');

//@desc Get all menus from restaurant
//@route GET /api/v1/restaurants/:restaurantId/menu
//@access  Public 
exports.getMenus = async (req, res, next) => {
    let query;
    query = MenuItem.find({ restaurant: req.params.RestaurantId });
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


//@desc Get all restaurants
//@route GET /api/v1/restaurants/:restaurantId/menu/:menuId
//@access  Public 
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


exports.addMenuItem = async (req, res, next) => {
    try {
        req.body.restaurant = req.params.RestaurantId;
        console.log(req.params);
        const restaurant = await Restaurant.findById(req.params.RestaurantId);
        if (!restaurant) {
            return res.status(404).json({ success: false, message: `No restaurant with the id of ${req.params.RestaurantId}` });
        }
        const menuitem = await MenuItem.create(req.body);

        res.status(200).json({
            success: true,
            data: menuitem
        });
    } catch (error) {
        console.log(error.stack);
        return res.status(500).json({ success: false, message: "Cannot create Menu" });
    }
};


exports.updateMenuItem = async (req, res, next) => {
    try {
      let menuItem = await MenuItem.findById(req.params.id);
      if (!menuItem) {
        return res.status(404).json({ success: false, message: `No menuItem with the id of ${req.params.id}` });
      }
      menuItem = await MenuItem.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
      });
  
      res.status(200).json({
        success: true,
        data: menuItem
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, message: 'Cannot update MenuItem' });
    }
  };


exports.deleteMenuItem = async (req, res, next) => {
    try {
        const menuItem = await MenuItem.findById(req.params.id);
        if (!menuItem) {
            return res.status(404).json({ success: false, message: `No menuItem with the id of ${req.params.id}` });
        }
        

        await menuItem.deleteOne();
        res.status(200).json({
            success: true,
            data: {}
        });

    } catch (error) {
        console.log(error.stack);
        return res.status(500).json({ success: false, message: "Cannot delete MenuItem" });
    }
};