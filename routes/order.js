const express = require('express');
const {getOrders, addOrder, deleteOrder, updateOrder, getOrder} = require('../controllers/order')
const router = express.Router({mergeParams:true});
const {protect,authorize} = require('../middleware/auth');

router.route('/').get(protect, getOrders).post(protect, addOrder)
router.route('/:id').delete(protect,deleteOrder).put(protect,updateOrder).get(protect,getOrder)
module.exports=router;