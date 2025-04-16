const express = require('express');

const {getMenus,getMenu} = require('../controllers/menu');

const router = express.Router({mergeParams:true});


const {protect,authorize} = require('../middleware/auth');


router.route('/').get(getMenus);
router.route('/:id').get(getMenu);

module.exports=router;