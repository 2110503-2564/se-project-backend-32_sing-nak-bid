const express = require('express');

const {getMenus,getMenu,addMenuItem, deleteMenuItem, updateMenuItem} = require('../controllers/menu');

const router = express.Router({mergeParams:true});


const {protect,authorize} = require('../middleware/auth');


router.route('/').get(getMenus).post(protect, authorize('admin','manager'),addMenuItem);
router.route('/:id').get(getMenu).put(protect, authorize('admin','manager'),updateMenuItem).delete(protect, authorize('admin','manager'),deleteMenuItem);

module.exports=router;