const express = require('express');

const {getMenus,getMenu,addMenuItem} = require('../controllers/menu');

const router = express.Router({mergeParams:true});


const {protect,authorize} = require('../middleware/auth');


router.route('/').get(getMenus).post(protect, authorize('admin','manager'),addMenuItem);
router.route('/:id').get(getMenu);

module.exports=router;