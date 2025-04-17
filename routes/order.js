const express = require('express');
const {getOrders} = require('../controllers/order')
const router = express.Router({mergeParams:true});
const {protect,authorize} = require('../middleware/auth');
router.route('/').get(protect, getOrders)


module.exports=router;