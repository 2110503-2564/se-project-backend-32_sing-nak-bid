const Restaurant = require('../models/Restaurant.js');
const Reservation = require('../models/Reservation.js');

//@desc Get all restaurants
//@route GET /api/v1/restaurants
//@access  Public 
exports.getRestaurants=async(req,res,next)=>{
    let query;

    //Copy req.qeury
    const reqQuery={...req.query}; //split to array of key,value

    //exclude some fields => select,sort
    const removeFields = ['select','sort','page','limit'];

    //Loop over remove fields and delete them from reqQuery
    removeFields.forEach(param=>delete reqQuery[param]);
    console.log(reqQuery);

    //Create query String
    let queryStr = JSON.stringify(reqQuery);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g,match=>`$${match}`);

    //finding resource
    query = Restaurant.find(JSON.parse(queryStr)).populate('reservations').populate({
        path: 'menuItems',
        populate: {
          path: 'allergens',
          model: 'Allergen'
        }
      });

    //Select Fields
    if(req.query.select){
        const fields = req.query.select.split(',').join(' ');
        query=query.select(fields);
    }

    //sort 
    if(req.query.sort){
        const sortBy = req.query.sort.split(',').join(' ');
        query=query.sort(sortBy);
    }else{
        query = query.sort(`-createAt`);
    }

    //Pagination
    const page = parseInt(req.query.page,10) || 1;
    const limit = parseInt(req.query.limit,10) ||25;
    const startIndex = (page-1)*limit;
    const endIndex = page*limit;
   
    try{
        const total = await Restaurant.countDocuments();
     query = query.skip(startIndex).limit(limit);

     //Execute query
        const restaurants = await query;
    

        //Pagination result
        const pagination = {};

        if(endIndex < total){
            pagination.next ={
                page:page+1,
                limit
            }
        }

        if(startIndex > 0){
            pagination.prev={
                page:page-1,
                limit
            }
        }
        console.log(req.user.id)
        const restaurant = await Restaurant.find({ managerId: req.user.id });
        
        if( req.user.role === 'manager' && restaurant){
            res.status(200).json({success:true , count : restaurant.length,data: restaurant});
          }
          else{
            res.status(200).json({success:true , count : restaurants.length,data: restaurants});
          }
    }
    
    catch(err){

    res.status(400).json({success: false});
    console.log(err.stack);
}
}

exports.getRestaurantsUser=async(req,res,next)=>{
    let query;

    //Copy req.qeury
    const reqQuery={...req.query}; //split to array of key,value

    //exclude some fields => select,sort
    const removeFields = ['select','sort','page','limit'];

    //Loop over remove fields and delete them from reqQuery
    removeFields.forEach(param=>delete reqQuery[param]);
    console.log(reqQuery);

    //Create query String
    let queryStr = JSON.stringify(reqQuery);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g,match=>`$${match}`);

    //finding resource
    query = Restaurant.find(JSON.parse(queryStr)).populate('reservations').populate({
        path: 'menuItems',
        populate: {
          path: 'allergens',
          model: 'Allergen'
        }
      });

    //Select Fields
    if(req.query.select){
        const fields = req.query.select.split(',').join(' ');
        query=query.select(fields);
    }

    //sort 
    if(req.query.sort){
        const sortBy = req.query.sort.split(',').join(' ');
        query=query.sort(sortBy);
    }else{
        query = query.sort(`-createAt`);
    }

    //Pagination
    const page = parseInt(req.query.page,10) || 1;
    const limit = parseInt(req.query.limit,10) ||25;
    const startIndex = (page-1)*limit;
    const endIndex = page*limit;
   
    try{
        const total = await Restaurant.countDocuments();
     query = query.skip(startIndex).limit(limit);

     //Execute query
        const restaurants = await query;
    

        //Pagination result
        const pagination = {};

        if(endIndex < total){
            pagination.next ={
                page:page+1,
                limit
            }
        }

        if(startIndex > 0){
            pagination.prev={
                page:page-1,
                limit
            }
        }
        res.status(200).json({success:true , count : restaurants.length,data: restaurants});
    }

    
    
    catch(err){

    res.status(400).json({success: false});
    console.log(err.stack);
}
}




//@desc Get single restaurants
//@route GET /api/v1/restaurants/:id
//@access  Public 
exports.getRestaurant=async(req,res,next)=>{
   try{
    const restaurant = await Restaurant.findById(req.params.id);
    
    //check if restaurant is exists in database
    if(!restaurant){
        return  res.status(400).json({success: false,messsage : `Restaurant not found with id of ${req.params.id}`});
    }

    res.status(200).json({success:true, data: restaurant});
   }catch(err){
    res.status(400).json({success: false});
}}

//@desc Create a Restaurants
//@route POST /api/v1/restaurants
//@access  Private
exports.createRestaurant=async(req,res,next)=>{
    const restaurant = await Restaurant.create(req.body);
    res.status(201).json({success:true ,data : restaurant});
}

//@desc  Update single Restaurants
//@route PUT /api/v1/Restaurants/:id
//@access  Private
exports.updateRestaurant=async(req,res,next)=>{
    try{
        const restaurant = await Restaurant.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true
        });
        
        //check if Restaurant is exists
        if(!restaurant){
            return  res.status(400).json({success: false, messsage : `Restaurant not found with id of ${req.params.id}`});
        }
        res.status(200).json({success:true, data: restaurant});
       }catch(err){
       
        res.status(400).json({success: false});
    }
}


//@desc  Delete single Restaurants
//@route DELETE /api/v1/Restaurants/:id
//@access  Private
exports.deleteRestaurant=async(req,res,next)=>{
    try{
        const restaurant = await Restaurant.findById(req.params.id);
        
        //check if restaurant is exists
        if(!restaurant){
            return  res.status(400).json({success: false , messsage : `Restaurant not found with id of ${req.params.id}`});
        }

        await Reservation.deleteMany({restaurant: req.params.id});
        await Restaurant.deleteOne({ _id: req.params.id});

        res.status(200).json({success:true, data: {}});
       }catch(err){
        console.log(err.stack);
        res.status(400).json({success: false});
    }
}