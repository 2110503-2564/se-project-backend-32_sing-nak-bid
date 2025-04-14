const express = require('express');

const {getMenus} = require('../controllers/menu');

const router = express.Router({mergeParams:true});


const {protect,authorize} = require('../middleware/auth');


router.route('/').get(getMenus);


module.exports=router;